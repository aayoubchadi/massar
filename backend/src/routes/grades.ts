import express from 'express'
import { body, validationResult } from 'express-validator'
import Grade, { IGrade } from '../models/Grade'
import Course from '../models/Course'

const router = express.Router()

// @route   GET /api/grades
// @desc    Get all grades for a student
// @access  Private
router.get('/', async (req: express.Request, res: express.Response): Promise<express.Response> => {
  try {
    const { studentId, courseId, semester } = req.query
    
    let query: any = {}
    if (studentId) query.studentId = studentId
    if (courseId) query.courseId = courseId
    if (semester) query.semester = semester
    
    const grades = await Grade.find(query)
      .populate('studentId', 'name email')
      .populate('courseId', 'name code')
      .sort({ date: -1 })
    
    return res.status(200).json({
      message: 'Grades retrieved successfully',
      grades
    })
  } catch (error) {
    console.error('Error fetching grades:', error)
    return res.status(500).json({
      error: 'Server Error',
      message: 'Failed to fetch grades'
    })
  }
})

// @route   GET /api/grades/student/:studentId
// @desc    Get grades for a specific student
// @access  Private
router.get('/student/:studentId', async (req: express.Request, res: express.Response): Promise<express.Response> => {
  try {
    const { semester } = req.query
    const studentId = req.params.studentId
    
    let query: any = { studentId }
    if (semester) query.semester = semester
    
    const grades = await Grade.find(query)
      .populate('courseId', 'name code teacher credits')
      .sort({ date: -1 })
    
    // Calculate average for each course
    const courseAverages = grades.reduce((acc, grade) => {
      const courseId = grade.courseId._id.toString()
      if (!acc[courseId]) {
        acc[courseId] = {
          course: grade.courseId,
          grades: [],
          average: 0,
          totalScore: 0,
          maxScore: 0
        }
      }
      acc[courseId].grades.push(grade)
      acc[courseId].totalScore += (grade.score / grade.maxScore) * 100
      acc[courseId].maxScore += 100
      acc[courseId].average = acc[courseId].totalScore / acc[courseId].grades.length
      return acc
    }, {} as any)
    
    return res.status(200).json({
      message: 'Student grades retrieved successfully',
      courseAverages: Object.values(courseAverages)
    })
  } catch (error) {
    console.error('Error fetching student grades:', error)
    return res.status(500).json({
      error: 'Server Error',
      message: 'Failed to fetch student grades'
    })
  }
})

// @route   POST /api/grades
// @desc    Create a new grade (teacher/admin only)
// @access  Private
router.post('/', [
  body('studentId').notEmpty().withMessage('Student ID is required'),
  body('courseId').notEmpty().withMessage('Course ID is required'),
  body('assignmentName').trim().isLength({ min: 2, max: 200 }).withMessage('Assignment name must be between 2 and 200 characters'),
  body('score').isInt({ min: 0, max: 100 }).withMessage('Score must be between 0 and 100'),
  body('maxScore').isInt({ min: 1, max: 100 }).withMessage('Max score must be between 1 and 100'),
  body('semester').isIn(['fall', 'spring', 'summer']).withMessage('Invalid semester'),
  body('type').isIn(['exam', 'homework', 'quiz', 'project', 'participation']).withMessage('Invalid grade type'),
  body('comments').optional().trim().isLength({ max: 500 }).withMessage('Comments cannot exceed 500 characters')
], async (req: express.Request, res: express.Response): Promise<express.Response> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation Error',
        details: errors.array()
      })
    }

    const { studentId, courseId, assignmentName, score, maxScore, semester, type, comments } = req.body

    // Verify course exists
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(400).json({
        error: 'Invalid Course',
        message: 'The specified course does not exist'
      })
    }

    const grade = new Grade({
      studentId,
      courseId,
      assignmentName,
      score,
      maxScore,
      semester,
      type,
      comments,
      date: new Date()
    })

    await grade.save()
    await grade.populate('studentId', 'name email')
    await grade.populate('courseId', 'name code')

    return res.status(201).json({
      message: 'Grade created successfully',
      grade
    })
  } catch (error) {
    console.error('Error creating grade:', error)
    return res.status(500).json({
      error: 'Server Error',
      message: 'Failed to create grade'
    })
  }
})

// @route   PUT /api/grades/:id
// @desc    Update a grade (teacher/admin only)
// @access  Private
router.put('/:id', [
  body('score').optional().isInt({ min: 0, max: 100 }).withMessage('Score must be between 0 and 100'),
  body('maxScore').optional().isInt({ min: 1, max: 100 }).withMessage('Max score must be between 1 and 100'),
  body('comments').optional().trim().isLength({ max: 500 }).withMessage('Comments cannot exceed 500 characters')
], async (req: express.Request, res: express.Response): Promise<express.Response> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation Error',
        details: errors.array()
      })
    }

    const grade = await Grade.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('studentId', 'name email')
     .populate('courseId', 'name code')

    if (!grade) {
      return res.status(404).json({
        error: 'Grade not found',
        message: 'Grade with the specified ID does not exist'
      })
    }

    return res.status(200).json({
      message: 'Grade updated successfully',
      grade
    })
  } catch (error) {
    console.error('Error updating grade:', error)
    return res.status(500).json({
      error: 'Server Error',
      message: 'Failed to update grade'
    })
  }
})

// @route   DELETE /api/grades/:id
// @desc    Delete a grade (teacher/admin only)
// @access  Private
router.delete('/:id', async (req: express.Request, res: express.Response): Promise<express.Response> => {
  try {
    const grade = await Grade.findByIdAndDelete(req.params.id)
    if (!grade) {
      return res.status(404).json({
        error: 'Grade not found',
        message: 'Grade with the specified ID does not exist'
      })
    }

    return res.status(200).json({
      message: 'Grade deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting grade:', error)
    return res.status(500).json({
      error: 'Server Error',
      message: 'Failed to delete grade'
    })
  }
})

export default router
