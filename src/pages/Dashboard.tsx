import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Award, TrendingUp, Play, CheckCircle, Star, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockCourses } from '../data/mockData';

const Dashboard = () => {
  const { user } = useAuth();

  const enrolledCourses = mockCourses.filter(course => 
    user?.enrolledCourses?.includes(course.id)
  );

  const completedCourses = mockCourses.filter(course => 
    user?.completedCourses?.includes(course.id)
  );

  const stats = [
    {
      icon: BookOpen,
      label: 'Enrolled Courses',
      value: enrolledCourses.length,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: CheckCircle,
      label: 'Completed Courses',
      value: completedCourses.length,
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Clock,
      label: 'Hours Learned',
      value: '48h',
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Award,
      label: 'Certificates',
      value: completedCourses.length,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'course_progress',
      title: 'Completed "JavaScript Fundamentals" lesson',
      course: 'Complete Web Development Bootcamp',
      time: '2 hours ago',
      icon: Play,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'exam',
      title: 'Scored 85% on HTML/CSS Quiz',
      course: 'Complete Web Development Bootcamp',
      time: '1 day ago',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'enrollment',
      title: 'Enrolled in Data Science course',
      course: 'Data Science with Python',
      time: '3 days ago',
      icon: BookOpen,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Continue your learning journey and track your progress
          </p>
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
          {/* Continue Learning */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Continue Learning</h2>
              </div>
              <div className="p-6">
                {enrolledCourses.length > 0 ? (
                  <div className="space-y-6">
                    {enrolledCourses.map((course) => (
                      <div key={course.id} className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg hover:border-blue-200 transition-colors duration-200">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{course.title}</h3>
                          <p className="text-sm text-gray-600">{course.instructor}</p>
                          <div className="mt-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-500">Progress</span>
                              <span className="text-xs text-gray-500">65%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                            </div>
                          </div>
                        </div>
                        <Link
                          to={`/courses/${course.id}`}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                        >
                          <Play className="h-4 w-4" />
                          <span>Continue</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No courses enrolled</h3>
                    <p className="text-gray-600 mb-4">Start your learning journey by enrolling in a course</p>
                    <Link
                      to="/courses"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Browse Courses
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Completed Courses */}
            {completedCourses.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm mt-8">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900">Completed Courses</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {completedCourses.map((course) => (
                      <div key={course.id} className="flex items-center space-x-3 p-4 border border-gray-100 rounded-lg">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{course.title}</h3>
                          <p className="text-sm text-gray-600">{course.instructor}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Award className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm text-green-600 font-medium">Completed</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="bg-gray-100 p-2 rounded-lg">
                          <Icon className={`h-4 w-4 ${activity.color}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          <p className="text-xs text-gray-600">{activity.course}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <Link
                  to="/courses"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Browse Courses</span>
                </Link>
                <Link
                  to="/profile"
                  className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Calendar className="h-4 w-4" />
                  <span>View Profile</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;