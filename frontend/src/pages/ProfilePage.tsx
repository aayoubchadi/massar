import { useAuth } from '../contexts/AuthContext'
import { User, Mail, School, Calendar, Edit2, Camera, Settings, LogOut } from 'lucide-react'

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">الملف الشخصي</h1>
          <p className="text-gray-600">إدارة معلوماتك الشخصية والإعدادات</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="bg-gray-200 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-4">
                    <User className="h-16 w-16 text-gray-400" />
                  </div>
                  <button className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{user?.name}</h2>
                <p className="text-gray-600 mb-4">
                  {user?.role === 'student' ? 'طالب' : user?.role === 'teacher' ? 'أستاذ' : 'ولي أمر'}
                </p>
                
                <div className="space-y-3 text-right">
                  <div className="flex items-center justify-end space-x-reverse space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{user?.email}</span>
                  </div>
                  <div className="flex items-center justify-end space-x-reverse space-x-2">
                    <School className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{user?.school}</span>
                  </div>
                  <div className="flex items-center justify-end space-x-reverse space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{user?.class}</span>
                  </div>
                  <div className="flex items-center justify-end space-x-reverse space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {user?.lastLogin ? `آخر دخول: ${new Date(user.lastLogin).toLocaleDateString('ar-MA')}` : 'لم يتم تسجيل الدخول'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">إجراءات سريعة</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-end space-x-reverse space-x-3 p-3 text-right hover:bg-gray-50 rounded-lg transition-colors">
                  <span className="text-sm font-medium">تغيير كلمة المرور</span>
                  <Settings className="h-4 w-4 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-end space-x-reverse space-x-3 p-3 text-right hover:bg-gray-50 rounded-lg transition-colors">
                  <span className="text-sm font-medium">إعدادات الخصوصية</span>
                  <Settings className="h-4 w-4 text-gray-400" />
                </button>
                <button 
                  onClick={logout}
                  className="w-full flex items-center justify-end space-x-reverse space-x-3 p-3 text-right hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                >
                  <span className="text-sm font-medium">تسجيل الخروج</span>
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">المعلومات الشخصية</h3>
                <button className="flex items-center space-x-reverse space-x-2 text-primary-600 hover:text-primary-700">
                  <Edit2 className="h-4 w-4" />
                  <span className="text-sm font-medium">تعديل</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                  <p className="text-gray-900">{user?.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                  <p className="text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">نوع المستخدم</label>
                  <p className="text-gray-900">
                    {user?.role === 'student' ? 'طالب' : user?.role === 'teacher' ? 'أستاذ' : 'ولي أمر'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">المؤسسة التعليمية</label>
                  <p className="text-gray-900">{user?.school}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الفصل الدراسي</label>
                  <p className="text-gray-900">{user?.class}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ التسجيل</label>
                  <p className="text-gray-900">
                    {user ? new Date(user.createdAt || '').toLocaleDateString('ar-MA') : ''}
                  </p>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">المعلومات الأكاديمية</h3>
                <button className="flex items-center space-x-reverse space-x-2 text-primary-600 hover:text-primary-700">
                  <Edit2 className="h-4 w-4" />
                  <span className="text-sm font-medium">تعديل</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">المعدل العام</label>
                  <p className="text-2xl font-bold text-primary-600">16.17</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">التقدير</label>
                  <p className="text-lg font-semibold text-green-600">ممتاز</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">عدد المواد</label>
                  <p className="text-gray-900">8 مواد</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">نسبة الحضور</label>
                  <p className="text-gray-900">95%</p>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">إعدادات الإشعارات</h3>
                <button className="flex items-center space-x-reverse space-x-2 text-primary-600 hover:text-primary-700">
                  <Settings className="h-4 w-4" />
                  <span className="text-sm font-medium">إعدادات</span>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">الإشعارات البريدية</p>
                    <p className="text-sm text-gray-600">تلقي إشعارات عبر البريد الإلكتروني</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">إشعارات الواجبات</p>
                    <p className="text-sm text-gray-600">تلقي تنبيهات عند إضافة واجبات جديدة</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">إشعارات النتائج</p>
                    <p className="text-sm text-gray-600">تلقي إشعارات عند إضافة نتائج جديدة</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
