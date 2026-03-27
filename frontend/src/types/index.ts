export interface User {
  id: string
  name: string
  email: string
  role: 'student' | 'teacher' | 'parent' | 'admin'
  school?: string
  class?: string
  avatar?: string
}

export interface Course {
  id: string
  name: string
  code: string
  teacher: string
  schedule: string
  room: string
  credits: number
  description?: string
}

export interface Grade {
  id: string
  courseId: string
  courseName: string
  assignment: string
  score: number
  maxScore: number
  date: string
  semester: string
}

export interface Attendance {
  id: string
  courseId: string
  date: string
  status: 'present' | 'absent' | 'late'
  notes?: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'success' | 'error'
  date: string
  read: boolean
}
