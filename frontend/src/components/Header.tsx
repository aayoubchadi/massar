import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { User, GraduationCap, Home, BookOpen, FileText, Settings, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setIsLoggedIn(false)
    navigate('/')
    setIsMobileMenuOpen(false)
  }

  const navigation = [
    { name: 'الرئيسية', href: '/', icon: Home },
    { name: 'لوحة التحكم', href: '/dashboard', icon: GraduationCap },
    { name: 'المواد الدراسية', href: '/courses', icon: BookOpen },
    { name: 'النتائج', href: '/grades', icon: FileText },
    { name: 'الملف الشخصي', href: '/profile', icon: Settings },
  ]

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-reverse space-x-2">
              <div className="bg-primary-600 text-white p-2 rounded-lg">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-gray-900">منصة المسار</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-reverse space-x-4">
            {isLoggedIn && navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center space-x-reverse space-x-1 text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-reverse space-x-4">
            {isLoggedIn && user ? (
              <div className="flex items-center space-x-reverse space-x-3">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role === 'student' ? 'طالب' : user.role === 'teacher' ? 'أستاذ' : 'أولياء'}</p>
                </div>
                <div className="bg-gray-200 p-2 rounded-full">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-reverse space-x-1 text-red-600 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>خروج</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-primary"
              >
                تسجيل الدخول
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-2">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isLoggedIn && navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-reverse space-x-2 text-gray-600 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
            {isLoggedIn && user ? (
              <div className="px-2 pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center space-x-reverse space-x-3 px-3">
                  <div className="bg-gray-200 p-2 rounded-full">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.role === 'student' ? 'طالب' : user.role === 'teacher' ? 'أستاذ' : 'أولياء'}</p>
                  </div>
                </div>
                <div className="mt-3 px-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-reverse space-x-1 text-red-600 hover:text-red-700 block px-3 py-2 rounded-md text-base font-medium w-full text-right"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>خروج</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-2 pt-4 pb-3 border-t border-gray-200">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary block text-center"
                >
                  تسجيل الدخول
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
