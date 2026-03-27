import mongoose from 'mongoose'
import User from '../models/User'
import Course from '../models/Course'
import Grade from '../models/Grade'
import Enrollment from '../models/Enrollment'
import bcrypt from 'bcryptjs'

const sampleUsers = [
  {
    name: 'أحمد محمد أحمد',
    email: 'ahmed.student@massar.ma',
    password: 'password123',
    role: 'student',
    school: 'مدرسة الشهيد حسن الأزهري',
    class: '3أ'
  },
  {
    name: 'فاطمة علي إبراهيم',
    email: 'fatima.student@massar.ma',
    password: 'password123',
    role: 'student',
    school: 'مدرسة الشهيد حسن الأزهري',
    class: '3ب'
  },
  {
    name: 'محمد عبدالله سعيد',
    email: 'mohammed.teacher@massar.ma',
    password: 'password123',
    role: 'teacher',
    school: 'مدرسة الشهيد حسن الأزهري'
  },
  {
    name: 'خالدية أحمد',
    email: 'khalid.parent@massar.ma',
    password: 'password123',
    role: 'parent',
    school: 'مدرسة الشهيد حسن الأزهري'
  }
]

const sampleCourses = [
  {
    name: 'الرياضيات',
    code: 'MATH301',
    description: 'مقرر الرياضيات للسنة الثالثة إعدادي',
    teacher: 'محمد عبدالله سعيد',
    credits: 4,
    schedule: 'الإثنين والأربعاء',
    room: 'قاعة 101',
    semester: 'fall'
  },
  {
    name: 'الفيزياء',
    code: 'PHYS301',
    description: 'مقرر الفيزياء للسنة الثالثة إعدادي',
    teacher: 'أمينة يوسف',
    credits: 3,
    schedule: 'الثلاثاء والخميس',
    room: 'مختبر الفيزياء',
    semester: 'fall'
  },
  {
    name: 'اللغة العربية',
    code: 'ARAB301',
    description: 'مقرر اللغة العربية والنحو',
    teacher: 'عبدالله الحسن',
    credits: 3,
    schedule: 'الأحد والثلاثاء',
    room: 'قاعة 203',
    semester: 'fall'
  },
  {
    name: 'التاريخ',
    code: 'HIST301',
    description: 'مقرر التاريخ الحديث',
    teacher: 'مريم أحمد',
    credits: 2,
    schedule: 'الأحد والخميس',
    room: 'قاعة 105',
    semester: 'fall'
  }
]

const sampleGrades = [
  {
    studentEmail: 'ahmed.student@massar.ma',
    courseCode: 'MATH301',
    assignmentName: 'اختبار الفصل الأول',
    score: 17,
    maxScore: 20,
    type: 'exam',
    date: new Date('2024-03-15'),
    semester: 'fall'
  },
  {
    studentEmail: 'ahmed.student@massar.ma',
    courseCode: 'MATH301',
    assignmentName: 'واجب المنزل رقم 1',
    score: 18,
    maxScore: 20,
    type: 'homework',
    date: new Date('2024-03-10'),
    semester: 'fall'
  },
  {
    studentEmail: 'ahmed.student@massar.ma',
    courseCode: 'PHYS301',
    assignmentName: 'اختبار عملي',
    score: 16,
    maxScore: 20,
    type: 'exam',
    date: new Date('2024-03-14'),
    semester: 'fall'
  },
  {
    studentEmail: 'fatima.student@massar.ma',
    courseCode: 'MATH301',
    assignmentName: 'اختبار الفصل الأول',
    score: 15,
    maxScore: 20,
    type: 'exam',
    date: new Date('2024-03-15'),
    semester: 'fall'
  }
]

async function seedDatabase() {
  try {
    console.log('Starting database seeding...')
    
    // Clear existing data
    await User.deleteMany({})
    await Course.deleteMany({})
    await Grade.deleteMany({})
    await Enrollment.deleteMany({})
    
    console.log('Cleared existing data')
    
    // Create users
    const createdUsers = []
    for (const userData of sampleUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 12)
      const user = new User({
        ...userData,
        password: hashedPassword
      })
      await user.save()
      createdUsers.push(user)
      console.log(`Created user: ${user.name}`)
    }
    
    // Create courses
    const createdCourses = []
    for (const courseData of sampleCourses) {
      const course = new Course(courseData)
      await course.save()
      createdCourses.push(course)
      console.log(`Created course: ${course.name}`)
    }
    
    // Create enrollments for students
    const students = createdUsers.filter(u => u.role === 'student')
    const courses = createdCourses
    
    for (const student of students) {
      for (const course of courses) {
        const enrollment = new Enrollment({
          studentId: student._id,
          courseId: course._id,
          semester: 'fall',
          academicYear: '2023-2024'
        })
        await enrollment.save()
        console.log(`Enrolled ${student.name} in ${course.name}`)
      }
    }
    
    // Create grades
    for (const gradeData of sampleGrades) {
      const user = createdUsers.find(u => u.email === gradeData.studentEmail)
      const course = createdCourses.find(c => c.code === gradeData.courseCode)
      
      if (user && course) {
        const grade = new Grade({
          studentId: user._id,
          courseId: course._id,
          assignmentName: gradeData.assignmentName,
          score: gradeData.score,
          maxScore: gradeData.maxScore,
          date: gradeData.date,
          semester: gradeData.semester,
          type: gradeData.type
        })
        await grade.save()
        console.log(`Created grade: ${gradeData.assignmentName} for ${user.name}`)
      }
    }
    
    console.log('Database seeding completed successfully!')
    console.log('\nSample login credentials:')
    console.log('Student: ahmed.student@massar.ma / password123')
    console.log('Teacher: mohammed.teacher@massar.ma / password123')
    console.log('Parent: khalid.parent@massar.ma / password123')
    
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/massar_platform')
    .then(() => {
      seedDatabase()
      process.exit(0)
    })
    .catch((error) => {
      console.error('Database connection error:', error)
      process.exit(1)
    })
}

export default seedDatabase
