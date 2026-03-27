import { BookOpen, Clock, MapPin, User, Calendar } from 'lucide-react'

const CoursesPage: React.FC = () => {
  const courses = [
    {
      id: '1',
      name: 'الرياضيات',
      code: 'MATH101',
      teacher: 'الأستاذ محمد أحمد',
      schedule: 'الإثنين والأربعاء',
      time: '8:00 - 9:30',
      room: 'قاعة 101',
      credits: 4,
      description: 'مقرر الرياضيات للسنة الأولى ثانوي'
    },
    {
      id: '2',
      name: 'الفيزياء',
      code: 'PHYS101',
      teacher: 'الأستاذة فاطمة علي',
      schedule: 'الثلاثاء والخميس',
      time: '10:00 - 11:30',
      room: 'مختبر الفيزياء',
      credits: 3,
      description: 'مقرر الفيزياء للسنة الأولى ثانوي'
    },
    {
      id: '3',
      name: 'اللغة العربية',
      code: 'ARAB101',
      teacher: 'الأستاذ عبدالله سعيد',
      schedule: 'الأحد والثلاثاء',
      time: '14:00 - 15:30',
      room: 'قاعة 203',
      credits: 3,
      description: 'مقرر اللغة العربية والنحو'
    },
    {
      id: '4',
      name: 'التاريخ',
      code: 'HIST101',
      teacher: 'الأستاذة مريم حسن',
      schedule: 'الأحد والخميس',
      time: '11:30 - 13:00',
      room: 'قاعة 105',
      credits: 2,
      description: 'مقرر التاريخ الحديث'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">المواد الدراسية</h1>
          <p className="text-gray-600">عرض جميع المواد الدراسية المسجلة</p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="card hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary-100 text-primary-600 p-3 rounded-full">
                  <BookOpen className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium text-gray-500">{course.code}</span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{course.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <User className="h-4 w-4 ml-2" />
                  <span>{course.teacher}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 ml-2" />
                  <span>{course.schedule}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 ml-2" />
                  <span>{course.time}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 ml-2" />
                  <span>{course.room}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">الوحدات</span>
                  <span className="text-lg font-semibold text-primary-600">{course.credits}</span>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-reverse space-x-2">
                <button className="flex-1 btn-secondary text-sm py-2">
                  التفاصيل
                </button>
                <button className="flex-1 btn-primary text-sm py-2">
                  الواجبات
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CoursesPage
