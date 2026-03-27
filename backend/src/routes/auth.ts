import express from 'express'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import User, { IUser } from '../models/User'

const router = express.Router()

// Generate JWT Token
const generateToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'fallback_secret',
    { expiresIn: process.env.JWT_EXPIRE || '7d' } as jwt.SignOptions
  )
}

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('userType').isIn(['student', 'parent', 'teacher', 'admin']).withMessage('Invalid user type')
], async (req: express.Request, res: express.Response): Promise<express.Response> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation Error',
        details: errors.array()
      })
    }

    const { email, password, userType } = req.body

    // Find user by email and include password
    const user = await User.findOne({ email, role: userType }).select('+password')
    
    if (!user) {
      return res.status(401).json({
        error: 'Authentication Failed',
        message: 'Invalid credentials'
      })
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        error: 'Account Deactivated',
        message: 'Your account has been deactivated'
      })
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Authentication Failed',
        message: 'Invalid credentials'
      })
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Generate token
    const token = generateToken(user._id.toString())

    // Prepare user data for response (without password)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      school: user.school,
      class: user.class,
      avatar: user.avatar,
      lastLogin: user.lastLogin
    }

    res.status(200).json({
      message: 'Login successful',
      token,
      user: userData
    })
    return res
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({
      error: 'Server Error',
      message: 'An error occurred during login'
    })
  }
})

// @route   POST /api/auth/register
// @desc    Register new user (admin only)
// @access  Private
router.post('/register', [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['student', 'teacher', 'parent', 'admin']).withMessage('Invalid user type'),
  body('school').optional().trim().isLength({ max: 200 }).withMessage('School name cannot exceed 200 characters'),
  body('class').optional().trim().isLength({ max: 50 }).withMessage('Class name cannot exceed 50 characters')
], async (req: express.Request, res: express.Response): Promise<express.Response> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation Error',
        details: errors.array()
      })
    }

    const { name, email, password, role, school, class: className } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        error: 'User Already Exists',
        message: 'A user with this email already exists'
      })
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role,
      school,
      class: className
    })

    await user.save()

    // Generate token
    const token = generateToken(user._id.toString())

    // Prepare user data for response (without password)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      school: user.school,
      class: user.class,
      avatar: user.avatar,
      createdAt: user.createdAt
    }

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: userData
    })
    return res
  } catch (error) {
    console.error('Registration error:', error)
    return res.status(500).json({
      error: 'Server Error',
      message: 'An error occurred during registration'
    })
  }
})

// @route   POST /api/auth/verify-token
// @desc    Verify JWT token
// @access  Private
router.post('/verify-token', async (req: express.Request, res: express.Response): Promise<express.Response> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({
        error: 'No Token',
        message: 'No token provided'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as { userId: string }
    
    const user = await User.findById(decoded.userId)
    if (!user || !user.isActive) {
      return res.status(401).json({
        error: 'Invalid Token',
        message: 'Token is invalid or user is inactive'
      })
    }

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      school: user.school,
      class: user.class,
      avatar: user.avatar
    }

    res.status(200).json({
      message: 'Token is valid',
      user: userData
    })
    return res
  } catch (error) {
    console.error('Token verification error:', error)
    return res.status(401).json({
      error: 'Invalid Token',
      message: 'Token is invalid'
    })
  }
})

export default router
