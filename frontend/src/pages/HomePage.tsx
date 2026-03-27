import { Link } from 'react-router-dom'
import { GraduationCap, Users, BookOpen, Award, ArrowLeft, CheckCircle } from 'lucide-react'

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: 'فضاء أولياء التلاميذ',
      description: 'متابعة مستوى أبنائكم والتواصل مع الإدارة التربوية',
      link: '/parent-login'
    },
    {
      icon: GraduationCap,
      title: 'فضاء التلاميذ',
      description: 'الاطلاع على النتائج والمواد الدراسية والجدول الزمني',
      link: '/student-login'
    },
    {
      icon: BookOpen,
      title: 'فضاء الأساتذة',
      description: 'إدارة المواد الدراسية وتتبع أداء الطلاب',
      link: '/teacher-login'
    },
    {
      icon: Award,
      title: 'فضاء الإدارة',
      description: 'إدارة المؤسسة التعليمية والبيانات الإحصائية',
      link: '/admin-login'
    }
  ]

  const stats = [
    { number: '1M+', label: 'طالب وطالبة' },
    { number: '50K+', label: 'أستاذ وأستاذة' },
    { number: '5K+', label: 'مؤسسة تعليمية' },
    { number: '99%', label: 'معدل الرضا' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              منصة المسار التعليمية
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              النظام المتكامل لإدارة شؤون الطلاب والمتابعة الأكاديمية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                تسجيل الدخول
              </Link>
              <Link
                to="/about"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                تعرف على المنصة
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Access Spaces */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              فضاءات الوصول المخصصة
            </h2>
            <p className="text-lg text-gray-600">
              اختر الفضاء المناسب لك للوصول إلى خدماتك التعليمية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="card hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="text-center">
                  <div className="bg-primary-100 text-primary-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              منصة المسار بالأرقام
            </h2>
            <p className="text-lg text-gray-600">
              أرقام تعكس نجاح وتطور المنصة التعليمية
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                لماذا منصة المسار؟
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-reverse space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">سهولة الاستخدام</h3>
                    <p className="text-gray-600">واجهة بسيطة ومباشرة مناسبة لجميع المستخدمين</p>
                  </div>
                </div>
                <div className="flex items-start space-x-reverse space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">أمان وحماية</h3>
                    <p className="text-gray-600">حماية البيانات الشخصية والسرية التامة</p>
                  </div>
                </div>
                <div className="flex items-start space-x-reverse space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">متواصل على مدار الساعة</h3>
                    <p className="text-gray-600">وصول للخدمات في أي وقت ومن أي مكان</p>
                  </div>
                </div>
                <div className="flex items-start space-x-reverse space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">دعم فني متخصص</h3>
                    <p className="text-gray-600">فريق دعم متخصص لمساعدتك في أي وقت</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-primary-100 rounded-lg p-8">
              <img
                src="/api/placeholder/600/400"
                alt="منصة المسار"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            انضم إلى منصة المسار اليوم
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            ابدأ رحلتك نحو إدارة تعليمية أفضل وأكثر فعالية
          </p>
          <Link
            to="/login"
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-reverse space-x-2"
          >
            <span>ابدأ الآن</span>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
