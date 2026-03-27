import express from 'express'
import { body, validationResult } from 'express-validator'
import Course, { ICourse } from '../models/Course'
import Enrollment from '../models/Enrollment'

const router = express.Router()

// @route   GET /api/courses
// @desc    Get all courses
// @access  Public
router.get('/', async (req: express.Request, res: express.Response): Promise<express.Response> => {
  try {
    const courses = await Course.find({ isActive: true }).sort({ name: 1 })
    return res.status(200).json({
      message: 'Courses retrieved successfully',
      courses
    })
  } catch (error) {
    console.error('Error fetching courses:', error)
    return res.status(500).json({
      error: 'Server Error',
      message: 'Failed to fetch courses'
    })
  }
})

// @route   GET /api/courses/:id
// @desc    Get course by ID
// @access  Public
router.get('/:id', async (req: express.Request, res: express.Response): Promise<express.Response> => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) {
      return res.status(404).json({
        error: 'Course not found',
        message: 'Course with the specified ID does not exist'
      })
    }
    return res.status(200).json({
      message: 'Course retrieved successfully',
      course
    })
  } catch (error) {
    console.error('Error fetching course:', error)
    return res.status(500).json({
      error: 'Server Error',
      message: 'Failed to fetch course'
    })
  }
})

// @route   POST /api/courses
// @desc    Create a new course (admin only)
// @access  Private
router.post('/', [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('code').trim().isLength({ min: 2, max: 20 }).withMessage('Code must be between 2 and 20 characters'),
  body('teacher').trim().isLength({ min: 2, max: 100 }).withMessage('Teacher name must be between 2 and 100 characters'),
  body('credits').isInt({ min: 1, max: 10 }).withMessage('Credits must be between 1 and 10'),
  body('schedule').trim().notEmpty().withMessage('Schedule is required'),
  body('room').trim().isLength({ min: 1, max: 50 }).withMessage('Room must be between 1 and 50 characters'),
  body('semester').isIn(['fall', 'spring', 'summer']).withMessage('Invalid semester'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters')
], async (req: express.Request, res: express.Response): Promise<express.Response> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation Error',
        details: errors.array()
      })
    }

    const { name, code, teacher, credits, schedule, room, semester, description } = req.body

    // Check if course code already exists
    const existingCourse = await Course.findOne({ code: code.toUpperCase() })
    if (existingCourse) {
      return res.status(400).json({
        error: 'Course already exists',
        message: 'A course with this code already exists'
      })
    }

    const course = new Course({
      name,
      code: code.toUpperCase(),
      teacher,
      credits,
      schedule,
      room,
      semester,
      description
    })

    await course.save()

    return res.status(201).json({
      message: 'Course created successfully',
      course
    })
  } catch (error) {
    console.error('Error creating course:', error)
    return res.status(500).json({
      error: 'Server Error',
      message: 'Failed to create course'
    })
  }
})

// @route   PUT /api/courses/:id
// @desc    Update a course (admin only)
// @access  Private
router.put('/:id', [
  body('name').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('teacher').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Teacher name must be between 2 and 100 characters'),
  body('credits').optional().isInt({ min: 1, max: 10 }).withMessage('Credits must be between 1 and 10'),
  body('schedule').optional().trim().notEmpty().withMessage('Schedule cannot be empty'),
  body('room').optional().trim().isLength({ min: 1, max: 50 }).withMessage('Room must be between 1 and 50 characters'),
  body('semester').optional().isIn(['fall', 'spring', 'summer']).withMessage('Invalid semester'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters')
], async (req: express.Request, res: express.Response): Promise<express.Response> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation Error',
        details: errors.array()
      })
    }

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!course) {
      return res.status(404).json({
        error: 'Course not found',
        message: 'Course with the specified ID does not exist'
      })
    }

    return res.status(200).json({
      message: 'Course updated successfully',
      course
    })
  } catch (error) {
    console.error('Error updating course:', error)
    return res.status(500).json({
      error: 'Server Error',
      message: 'Failed to update course'
    })
  }
})

// @route   DELETE /api/courses/:id
// @desc    Delete a course (admin only)
// @access  Private
router.delete('/:id', async (req: express.Request, res: express.Response): Promise<express.Response> => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id)
    if (!course) {
      return res.status(404).json({
        error: 'Course not found',
        message: 'Course with the specified ID does not exist'
      })
    }

    // Also delete related enrollments
    await Enrollment.deleteMany({ courseId: req.params.id })

    return res.status(200).json({
      message: 'Course deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting course:', error)
    return res.status(500).json({
      error: 'Server Error',
      message: 'Failed to delete course'
    })
  }
})

export default router
