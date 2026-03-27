import mongoose, { Document, Schema } from 'mongoose'

export interface ICourse extends Document {
  name: string
  code: string
  description?: string
  teacher: string
  credits: number
  schedule: string
  room: string
  semester: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const courseSchema = new Schema<ICourse>({
  name: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true,
    maxlength: [100, 'Course name cannot exceed 100 characters']
  },
  code: {
    type: String,
    required: [true, 'Course code is required'],
    unique: true,
    uppercase: true,
    trim: true,
    maxlength: [20, 'Course code cannot exceed 20 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  teacher: {
    type: String,
    required: [true, 'Teacher name is required'],
    trim: true,
    maxlength: [100, 'Teacher name cannot exceed 100 characters']
  },
  credits: {
    type: Number,
    required: [true, 'Credits are required'],
    min: [1, 'Credits must be at least 1'],
    max: [10, 'Credits cannot exceed 10']
  },
  schedule: {
    type: String,
    required: [true, 'Schedule is required'],
    trim: true
  },
  room: {
    type: String,
    required: [true, 'Room is required'],
    trim: true,
    maxlength: [50, 'Room cannot exceed 50 characters']
  },
  semester: {
    type: String,
    required: [true, 'Semester is required'],
    enum: ['fall', 'spring', 'summer'],
    default: 'fall'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// Index for better performance
courseSchema.index({ code: 1 })
courseSchema.index({ teacher: 1 })
courseSchema.index({ semester: 1 })

const Course = mongoose.model<ICourse>('Course', courseSchema)

export default Course
