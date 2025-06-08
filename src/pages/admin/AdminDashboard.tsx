import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, GraduationCap, TrendingUp, Plus, Eye, Edit, Trash2, Award, Clock, Star } from 'lucide-react';
import { mockCourses, mockStudents, mockExams } from '../../data/mockData';

const AdminDashboard = () => {
  const totalStudents = mockStudents.length;
  const totalCourses = mockCourses.length;
  const totalExams = mockExams.length;
  const totalRevenue = mockCourses.reduce((sum, course) => sum + (course.price * course.students), 0);

  const stats = [
    {
      icon: Users,
      label: 'Total Students',
      value: totalStudents,
      change: '+12%',
      changeType: 'positive',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: BookOpen,
      label: 'Total Courses',
      value: totalCourses,
      change: '+8%',
      changeType: 'positive',
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: GraduationCap,
      label: 'Total Exams',
      value: totalExams,
      change: '+25%',
      changeType: 'positive',
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      icon: TrendingUp,
      label: 'Revenue',
      value: `$${(totalRevenue / 1000).toFixed(1)}k`,
      change: '+15%',
      changeType: 'positive',
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50'
    }
  ];

  const recentStudents = mockStudents.slice(0, 5);
  const popularCourses = mockCourses.sort((a, b) => b.students - a.students).slice(0, 5);

  const quickActions = [
    {
      title: 'Add New Course',
      description: 'Create a new course with materials',
      icon: Plus,
      color: 'bg-blue-600',
      href: '/admin/courses'
    },
    {
      title: 'Manage Students',
      description: 'View and manage student accounts',
      icon: Users,
      color: 'bg-green-600',
      href: '/admin/students'
    },
    {
      title: 'Create Exam',
      description: 'Add new exam questions',
      icon: GraduationCap,
      color: 'bg-purple-600',
      href: '/admin/exams'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your eLearning platform</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <span className={`text-sm font-medium ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">from last month</span>
                    </div>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`h-6 w-6 ${stat.color} text-white`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={index}
                      to={action.href}
                      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                    >
                      <div className={`${action.color} p-3 rounded-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{action.title}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Recent Students */}
            <div className="bg-white rounded-xl shadow-sm mt-8">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Students</h2>
                  <Link
                    to="/admin/students"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View All
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentStudents.map((student) => (
                    <div key={student.id} className="flex items-center space-x-3">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{student.name}</p>
                        <p className="text-xs text-gray-500">
                          {student.enrolledCourses.length} course{student.enrolledCourses.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(student.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Popular Courses */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Popular Courses</h2>
                  <Link
                    to="/admin/courses"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Manage All
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {popularCourses.map((course) => (
                    <div key={course.id} className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-600">{course.instructor}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-500">{course.students}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <span className="text-sm text-gray-500">{course.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-sm font-medium text-green-600">${course.price}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 transition-colors duration-200">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">New student registration</p>
                      <p className="text-xs text-gray-600">Alice Johnson joined the platform</p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <BookOpen className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Course completion</p>
                      <p className="text-xs text-gray-600">Bob Smith completed "Web Development Bootcamp"</p>
                      <p className="text-xs text-gray-500 mt-1">4 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <GraduationCap className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Exam submitted</p>
                      <p className="text-xs text-gray-600">Carol Davis submitted "JavaScript Fundamentals" exam</p>
                      <p className="text-xs text-gray-500 mt-1">6 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-yellow-100 p-2 rounded-lg">
                      <Award className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Certificate issued</p>
                      <p className="text-xs text-gray-600">Certificate generated for "Data Science with Python"</p>
                      <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;