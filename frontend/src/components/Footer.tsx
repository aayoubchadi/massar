import { GraduationCap, Phone, Mail, MapPin, Facebook, Twitter, Youtube } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-reverse space-x-2 mb-4">
              <div className="bg-primary-600 text-white p-2 rounded-lg">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold">منصة المسار</span>
            </div>
            <p className="text-gray-300 mb-4">
              المنصة التعليمية المتكاملة لإدارة شؤون الطلاب والمتابعة الأكاديمية في النظام التعليمي المغربي.
            </p>
            <div className="flex space-x-reverse space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">عن المنصة</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">خدماتنا</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">الدعم الفني</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">سياسة الخصوصية</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">الشروط والأحكام</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">معلومات الاتصال</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-reverse space-x-2">
                <Phone className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300">+212 5XX-XXX-XXX</span>
              </div>
              <div className="flex items-center space-x-reverse space-x-2">
                <Mail className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300">support@massar.ma</span>
              </div>
              <div className="flex items-center space-x-reverse space-x-2">
                <MapPin className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300">الرباط، المغرب</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} منصة المسار. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
