import { useAuth } from '../contexts/AuthContext'
import { GraduationCap, BookOpen, FileText, Calendar, Users, Award, TrendingUp, Bell } from 'lucide-react'

const DashboardPage: React.FC = () => {
  const { user } = useAuth()

  const stats = [
    { label: 'المواد الدراسية', value: '8', icon: BookOpen, color: 'bg-blue-500' },
    { label: 'المعدل العام', value: '15.2', icon: Award, color: 'bg-green-500' },
    { label: 'الحضور', value: '95%', icon: Calendar, color: 'bg-purple-500' },
    { label: 'الواجبات', value: '12/15', icon: FileText, color: 'bg-orange-500' }
  ]

  const recentActivities = [
    { title: 'واجب الرياضيات', date: 'اليوم', status: 'تم التسليم' },
    { title: 'اختبار الفيزياء', date: 'أمس', status: 'النتيجة: 16/20' },
    { title: 'مشروع التاريخ', date: 'قبل يومين', status: 'قيد المراجعة' },
    { title: 'حضور الصف', date: 'قبل 3 أيام', status: 'حاضر' }
  ]

  const upcomingEvents = [
    { title: 'اختبار الرياضيات', date: 'غداً الساعة 9:00', type: 'exam' },
    { title: 'اجتماع أولياء الأمور', date: 'الأحد الساعة 14:00', type: 'meeting' },
    { title: 'نشاط رياضي', date: 'الثلاثاء الساعة 16:00', type: 'activity' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            مرحباً، {user?.name}
          </h1>
          <p className="text-gray-600">
            {user?.role === 'student' ? 'طالب' : user?.role === 'teacher' ? 'أستاذ' : 'ولي أمر'} - {user?.school} - {user?.class}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} text-white p-3 rounded-full`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">الأنشطة الأخيرة</h2>
                <TrendingUp className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-reverse space-x-3">
                      <div className="bg-primary-100 text-primary-600 p-2 rounded-full">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{activity.title}</h3>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-green-600">{activity.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">الفعاليات القادمة</h2>
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-reverse space-x-3">
                      <div className={`p-2 rounded-full ${
                        event.type === 'exam' ? 'bg-red-100 text-red-600' :
                        event.type === 'meeting' ? 'bg-blue-100 text-blue-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {event.type === 'exam' ? <FileText className="h-4 w-4" /> :
                         event.type === 'meeting' ? <Users className="h-4 w-4" /> :
                         <Calendar className="h-4 w-4" />}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{event.title}</h3>
                        <p className="text-sm text-gray-500">{event.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="card mt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">الإشعارات</h2>
                <Bell className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">تم إضافة واجب جديد في مادة الرياضيات</p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">تم تصحيح اختبار الفيزياء</p>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">تذكير: اجتماع أولياء الأمور يوم الأحد</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
