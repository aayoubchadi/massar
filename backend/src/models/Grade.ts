import mongoose, { Document, Schema } from 'mongoose'

export interface IGrade extends Document {
  studentId: mongoose.Types.ObjectId
  courseId: mongoose.Types.ObjectId
  assignmentName: string
  score: number
  maxScore: number
  date: Date
  semester: string
  type: 'exam' | 'homework' | 'quiz' | 'project' | 'participation'
  comments?: string
  createdAt: Date
  updatedAt: Date
}

const gradeSchema = new Schema<IGrade>({
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
  assignmentName: {
    type: String,
    required: [true, 'Assignment name is required'],
    trim: true,
    maxlength: [200, 'Assignment name cannot exceed 200 characters']
  },
  score: {
    type: Number,
    required: [true, 'Score is required'],
    min: [0, 'Score cannot be negative'],
    max: [100, 'Score cannot exceed 100']
  },
  maxScore: {
    type: Number,
    required: [true, 'Max score is required'],
    min: [1, 'Max score must be at least 1'],
    max: [100, 'Max score cannot exceed 100']
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now
  },
  semester: {
    type: String,
    required: [true, 'Semester is required'],
    enum: ['fall', 'spring', 'summer'],
    default: 'fall'
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: ['exam', 'homework', 'quiz', 'project', 'participation'],
    default: 'homework'
  },
  comments: {
    type: String,
    maxlength: [500, 'Comments cannot exceed 500 characters']
  }
}, {
  timestamps: true
})

// Index for better performance
gradeSchema.index({ studentId: 1 })
gradeSchema.index({ courseId: 1 })
gradeSchema.index({ date: 1 })
gradeSchema.index({ semester: 1 })

const Grade = mongoose.model<IGrade>('Grade', gradeSchema)

export default Grade
