import { FileText, TrendingUp, Award, Calendar } from 'lucide-react'

const GradesPage: React.FC = () => {
  const grades = [
    {
      id: '1',
      courseName: 'الرياضيات',
      assignments: [
        { name: 'اختبار الفصل الأول', score: 17, maxScore: 20, date: '2024-03-15', type: 'exam' },
        { name: 'واجب المنزل رقم 1', score: 18, maxScore: 20, date: '2024-03-10', type: 'homework' },
        { name: 'اختبار قصير', score: 15, maxScore: 20, date: '2024-03-05', type: 'quiz' }
      ],
      average: 16.67,
      grade: 'ممتاز'
    },
    {
      id: '2',
      courseName: 'الفيزياء',
      assignments: [
        { name: 'اختبار عملي', score: 16, maxScore: 20, date: '2024-03-14', type: 'exam' },
        { name: 'تقرير تجربة', score: 19, maxScore: 20, date: '2024-03-08', type: 'report' },
        { name: 'واجب المنزل رقم 2', score: 14, maxScore: 20, date: '2024-03-02', type: 'homework' }
      ],
      average: 16.33,
      grade: 'ممتاز'
    },
    {
      id: '3',
      courseName: 'اللغة العربية',
      assignments: [
        { name: 'إنشاء حر', score: 15, maxScore: 20, date: '2024-03-13', type: 'essay' },
        { name: 'اختبار نحو', score: 17, maxScore: 20, date: '2024-03-07', type: 'exam' },
        { name: 'قراءة وتعبير', score: 16, maxScore: 20, date: '2024-03-01', type: 'reading' }
      ],
      average: 16.00,
      grade: 'جيد جداً'
    },
    {
      id: '4',
      courseName: 'التاريخ',
      assignments: [
        { name: 'اختبار الفصل الأول', score: 14, maxScore: 20, date: '2024-03-12', type: 'exam' },
        { name: 'بحث تاريخي', score: 18, maxScore: 20, date: '2024-03-06', type: 'research' },
        { name: 'اختبار قصير', score: 15, maxScore: 20, date: '2024-02-28', type: 'quiz' }
      ],
      average: 15.67,
      grade: 'جيد جداً'
    }
  ]

  const overallAverage = 16.17
  const overallGrade = 'ممتاز'

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'ممتاز':
        return 'text-green-600 bg-green-100'
      case 'جيد جداً':
        return 'text-blue-600 bg-blue-100'
      case 'جيد':
        return 'text-yellow-600 bg-yellow-100'
      case 'مقبول':
        return 'text-orange-600 bg-orange-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 90) return 'text-green-600'
    if (percentage >= 80) return 'text-blue-600'
    if (percentage >= 70) return 'text-yellow-600'
    if (percentage >= 60) return 'text-orange-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">النتائج الدراسية</h1>
          <p className="text-gray-600">عرض جميع النتائج والمعدلات</p>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المعدل العام</p>
                <p className="text-3xl font-bold text-gray-900">{overallAverage.toFixed(2)}</p>
                <p className="text-sm text-gray-500">من 20</p>
              </div>
              <div className="bg-primary-100 text-primary-600 p-3 rounded-full">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">التقدير العام</p>
                <p className="text-2xl font-bold text-gray-900">{overallGrade}</p>
              </div>
              <div className="bg-green-100 text-green-600 p-3 rounded-full">
                <Award className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">عدد المواد</p>
                <p className="text-3xl font-bold text-gray-900">{grades.length}</p>
              </div>
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                <FileText className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Grades by Course */}
        <div className="space-y-6">
          {grades.map((course) => (
            <div key={course.id} className="card">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{course.courseName}</h3>
                  <div className="flex items-center space-x-reverse space-x-4">
                    <div className="text-left">
                      <p className="text-sm text-gray-600">المعدل</p>
                      <p className="text-lg font-bold text-gray-900">{course.average.toFixed(2)}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(course.grade)}`}>
                      {course.grade}
                    </span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        التقييم
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        النتيجة
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        النسبة
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        التاريخ
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        النوع
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {course.assignments.map((assignment, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {assignment.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`font-bold ${getScoreColor(assignment.score, assignment.maxScore)}`}>
                            {assignment.score}/{assignment.maxScore}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {((assignment.score / assignment.maxScore) * 100).toFixed(1)}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 ml-2" />
                            {new Date(assignment.date).toLocaleDateString('ar-MA')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                            {assignment.type === 'exam' ? 'اختبار' :
                             assignment.type === 'homework' ? 'واجب' :
                             assignment.type === 'quiz' ? 'اختبار قصير' :
                             assignment.type === 'essay' ? 'إنشاء' :
                             assignment.type === 'report' ? 'تقرير' :
                             assignment.type === 'research' ? 'بحث' :
                             assignment.type === 'reading' ? 'قراءة' : 'أخرى'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GradesPage
