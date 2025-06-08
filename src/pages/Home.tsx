import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Award, Play, Star, CheckCircle, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockCourses } from '../data/mockData';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Courses',
      description: 'Access hundreds of courses across various domains with expert instructors'
    },
    {
      icon: Users,
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of real-world experience'
    },
    {
      icon: Award,
      title: 'Certificates',
      description: 'Earn recognized certificates upon successful completion of courses'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed analytics and insights'
    }
  ];

  const stats = [
    { label: 'Active Students', value: '50K+' },
    { label: 'Expert Instructors', value: '500+' },
    { label: 'Course Hours', value: '10K+' },
    { label: 'Success Rate', value: '95%' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Learn New Skills
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                    Advance Your Career
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join thousands of learners advancing their careers through our comprehensive online courses. 
                  Learn at your own pace with expert instructors and real-world projects.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={user ? '/dashboard' : '/register'}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>{user ? 'Go to Dashboard' : 'Start Learning Today'}</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                
                <Link
                  to="/courses"
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Browse Courses</span>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?w=600&h=400&fit=crop"
                  alt="Online Learning"
                  className="w-full h-80 object-cover rounded-lg"
                />
                <div className="absolute -top-4 -left-4 bg-green-500 text-white p-3 rounded-full">
                  <Play className="h-6 w-6" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-blue-500 text-white p-3 rounded-full">
                  <Award className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Why Choose EduLearn?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of education with our innovative learning platform designed for modern learners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl hover:bg-blue-50 transition-colors duration-200 group"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-lg inline-block mb-4 group-hover:scale-110 transition-transform duration-200">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Featured Courses</h2>
            <p className="text-xl text-gray-600">Start your learning journey with our most popular courses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {course.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <img
                      src={course.instructorAvatar}
                      alt={course.instructor}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-600">{course.instructor}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{course.rating}</span>
                      <span className="text-sm text-gray-500">({course.students})</span>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">${course.price}</span>
                  </div>

                  <Link
                    to={`/courses/${course.id}`}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/courses"
              className="inline-flex items-center space-x-2 text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200"
            >
              <span>View All Courses</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of successful learners who have advanced their careers with EduLearn
          </p>
          <Link
            to={user ? '/courses' : '/register'}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <span>{user ? 'Browse Courses' : 'Get Started Today'}</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;