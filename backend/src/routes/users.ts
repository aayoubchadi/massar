import express from 'express'
import { body, validationResult } from 'express-validator'
import User, { IUser } from '../models/User'
import Grade from '../models/Grade'
import Enrollment from '../models/Enrollment'
import Course from '../models/Course'

const router = express.Router()

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', async (req: express.Request, res: express.Response): Promise<express.Response> => {
  try {
    // This would typically use JWT to get user ID from token
    // For now, we'll return a mock response
    return res.status(200).json({
      message: 'User profile endpoint',
      user: req.user
    })
  } catch (error) {
    console.error('Error fetching profile:', error)
    return res.status(500).json({
      error: 'Server Error',
      message: 'Failed to fetch profile'
    })
  }
})

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', async (req: express.Request, res: express.Response): Promise<express.Response> => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User with the specified ID does not exist'
      })
    }
    return res.status(200).json({
      message: 'User retrieved successfully',
      user
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    return res.status(500).json({
      error: 'Server Error',
      message: 'Failed to fetch user'
    })
  }
})

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', [
  body('name').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
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

    // This would typically use JWT to get user ID from token
    const userId = req.user?.id // Assuming user is attached via middleware
    
    const { name, school, class: className } = req.body
    
    const user = await User.findByIdAndUpdate(
      userId,
      { name, school, class: className },
      { new: true, runValidators: true }
    ).select('-password')

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User with the specified ID does not exist'
      })
    }

    return res.status(200).json({
      message: 'Profile updated successfully',
      user
    })
  } catch (error) {
    console.error('Error updating profile:', error)
    return res.status(500).json({
      error: 'Server Error',
      message: 'Failed to update profile'
    })
  }
})

// @route   GET /api/users/:id/dashboard
// @desc    Get user dashboard data
// @access  Private
router.get('/:id/dashboard', async (req: express.Request, res: express.Response): Promise<express.Response> => {
  try {
    const userId = req.params.id
    
    // Get user info
    const user = await User.findById(userId).select('-password')
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User with the specified ID does not exist'
      })
    }

    // Get enrollments
    const enrollments = await Enrollment.find({ 
      studentId: userId, 
      isActive: true 
    }).populate('courseId')

    // Get recent grades
    const recentGrades = await Grade.find({ studentId: userId })
      .populate('courseId', 'name code')
      .sort({ date: -1 })
      .limit(10)

    // Calculate statistics
    const totalGrades = recentGrades.length
    const averageScore = totalGrades > 0 
      ? recentGrades.reduce((sum, grade) => sum + (grade.score / grade.maxScore) * 100, 0) / totalGrades 
      : 0

    return res.status(200).json({
      message: 'Dashboard data retrieved successfully',
      user,
      stats: {
        enrolledCourses: enrollments.length,
        totalGrades,
        averageScore: averageScore.toFixed(2)
      },
      enrollments,
      recentGrades
    })
  } catch (error) {
    console.error('Error fetching dashboard:', error)
    return res.status(500).json({
      error: 'Server Error',
      message: 'Failed to fetch dashboard data'
    })
  }
})

// @route   GET /api/users/:id/courses
// @desc    Get user's enrolled courses
// @access  Private
router.get('/:id/courses', async (req: express.Request, res: express.Response): Promise<express.Response> => {
  try {
    const userId = req.params.id
    const { semester } = req.query
    
    let query: any = { studentId: userId, isActive: true }
    if (semester) query.semester = semester
    
    const enrollments = await Enrollment.find(query)
      .populate('courseId')
      .sort({ enrolledAt: -1 })

    const courses = enrollments.map(enrollment => enrollment.courseId)

    return res.status(200).json({
      message: 'Courses retrieved successfully',
      courses
    })
  } catch (error) {
    console.error('Error fetching user courses:', error)
    return res.status(500).json({
      error: 'Server Error',
      message: 'Failed to fetch courses'
    })
  }
})

export default router
