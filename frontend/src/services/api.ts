import axios, { AxiosResponse } from 'axios'

// API base configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Types
export interface LoginRequest {
  email: string
  password: string
  userType: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  role: string
  school?: string
  class?: string
}

export interface AuthResponse {
  message: string
  token: string
  user: {
    id: string
    name: string
    email: string
    role: string
    school?: string
    class?: string
    avatar?: string
    lastLogin?: string
    createdAt?: string
  }
}

export interface User {
  id: string
  name: string
  email: string
  role: string
  school?: string
  class?: string
  avatar?: string
  lastLogin?: string
  createdAt?: string
}

export interface Course {
  _id: string
  name: string
  code: string
  description?: string
  teacher: string
  credits: number
  schedule: string
  room: string
  semester: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Grade {
  _id: string
  studentId: string
  courseId: string
  assignmentName: string
  score: number
  maxScore: number
  date: string
  semester: string
  type: 'exam' | 'homework' | 'quiz' | 'project' | 'participation'
  comments?: string
  studentId_info?: {
    name: string
    email: string
  }
  courseId_info?: {
    name: string
    code: string
  }
}

export interface DashboardStats {
  enrolledCourses: number
  totalGrades: number
  averageScore: string
}

export interface DashboardData {
  user: User
  stats: DashboardStats
  enrollments: any[]
  recentGrades: Grade[]
}

// Auth API
export const authAPI = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await api.post('/auth/login', data)
    return response.data
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await api.post('/auth/register', data)
    return response.data
  },

  verifyToken: async (): Promise<{ message: string; user: User }> => {
    const response: AxiosResponse<{ message: string; user: User }> = await api.post('/auth/verify-token')
    return response.data
  },
}

// User API
export const userAPI = {
  getProfile: async (): Promise<{ message: string; user: User }> => {
    const response: AxiosResponse<{ message: string; user: User }> = await api.get('/users/profile')
    return response.data
  },

  updateProfile: async (data: Partial<User>): Promise<{ message: string; user: User }> => {
    const response: AxiosResponse<{ message: string; user: User }> = await api.put('/users/profile', data)
    return response.data
  },

  getDashboard: async (userId: string): Promise<DashboardData> => {
    const response: AxiosResponse<DashboardData> = await api.get(`/users/${userId}/dashboard`)
    return response.data
  },

  getCourses: async (userId: string, semester?: string): Promise<{ message: string; courses: Course[] }> => {
    const params = semester ? { semester } : {}
    const response: AxiosResponse<{ message: string; courses: Course[] }> = await api.get(`/users/${userId}/courses`, { params })
    return response.data
  },
}

// Course API
export const courseAPI = {
  getAll: async (): Promise<{ message: string; courses: Course[] }> => {
    const response: AxiosResponse<{ message: string; courses: Course[] }> = await api.get('/courses')
    return response.data
  },

  getById: async (id: string): Promise<{ message: string; course: Course }> => {
    const response: AxiosResponse<{ message: string; course: Course }> = await api.get(`/courses/${id}`)
    return response.data
  },

  create: async (data: Partial<Course>): Promise<{ message: string; course: Course }> => {
    const response: AxiosResponse<{ message: string; course: Course }> = await api.post('/courses', data)
    return response.data
  },

  update: async (id: string, data: Partial<Course>): Promise<{ message: string; course: Course }> => {
    const response: AxiosResponse<{ message: string; course: Course }> = await api.put(`/courses/${id}`, data)
    return response.data
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const response: AxiosResponse<{ message: string }> = await api.delete(`/courses/${id}`)
    return response.data
  },
}

// Grade API
export const gradeAPI = {
  getAll: async (params?: { studentId?: string; courseId?: string; semester?: string }): Promise<{ message: string; grades: Grade[] }> => {
    const response: AxiosResponse<{ message: string; grades: Grade[] }> = await api.get('/grades', { params })
    return response.data
  },

  getByStudent: async (studentId: string, semester?: string): Promise<{ message: string; courseAverages: any[] }> => {
    const params = semester ? { semester } : {}
    const response: AxiosResponse<{ message: string; courseAverages: any[] }> = await api.get(`/grades/student/${studentId}`, { params })
    return response.data
  },

  create: async (data: Partial<Grade>): Promise<{ message: string; grade: Grade }> => {
    const response: AxiosResponse<{ message: string; grade: Grade }> = await api.post('/grades', data)
    return response.data
  },

  update: async (id: string, data: Partial<Grade>): Promise<{ message: string; grade: Grade }> => {
    const response: AxiosResponse<{ message: string; grade: Grade }> = await api.put(`/grades/${id}`, data)
    return response.data
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const response: AxiosResponse<{ message: string }> = await api.delete(`/grades/${id}`)
    return response.data
  },
}

// Health check
export const healthAPI = {
  check: async (): Promise<{ status: string; message: string; timestamp: string; environment: string }> => {
    const response: AxiosResponse<{ status: string; message: string; timestamp: string; environment: string }> = await api.get('/health')
    return response.data
  },
}

export default api
