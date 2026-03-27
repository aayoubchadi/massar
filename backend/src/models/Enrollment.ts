import mongoose, { Document, Schema } from 'mongoose'

export interface IEnrollment extends Document {
  studentId: mongoose.Types.ObjectId
  courseId: mongoose.Types.ObjectId
  semester: string
  academicYear: string
  isActive: boolean
  enrolledAt: Date
  completedAt?: Date
  finalGrade?: number
  createdAt: Date
  updatedAt: Date
}

const enrollmentSchema = new Schema<IEnrollment>({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Student ID is required']
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course ID is required']
  },
  semester: {
    type: String,
    required: [true, 'Semester is required'],
    enum: ['fall', 'spring', 'summer'],
    default: 'fall'
  },
  academicYear: {
    type: String,
    required: [true, 'Academic year is required'],
    trim: true,
    maxlength: [20, 'Academic year cannot exceed 20 characters']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  enrolledAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date,
    default: null
  },
  finalGrade: {
    type: Number,
    min: [0, 'Final grade cannot be negative'],
    max: [20, 'Final grade cannot exceed 20'],
    default: null
  }
}, {
  timestamps: true
})

// Compound index for uniqueness
enrollmentSchema.index({ studentId: 1, courseId: 1, semester: 1, academicYear: 1 }, { unique: true })
enrollmentSchema.index({ studentId: 1 })
enrollmentSchema.index({ courseId: 1 })

const Enrollment = mongoose.model<IEnrollment>('Enrollment', enrollmentSchema)

export default Enrollment
