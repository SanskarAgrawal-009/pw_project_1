import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Download, Star, Clock, Users, Award, CheckCircle, BookOpen, FileText, Video, Presentation } from 'lucide-react';
import { mockCourses } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  const course = mockCourses.find(c => c.id === id);
  
  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
          <p className="text-gray-600 mb-4">The course you're looking for doesn't exist.</p>
          <Link
            to="/courses"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  const isEnrolled = user?.enrolledCourses?.includes(course.id);
  const isCompleted = user?.completedCourses?.includes(course.id);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'materials', label: 'Materials' },
    { id: 'instructor', label: 'Instructor' }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'pdf':
        return FileText;
      case 'ppt':
        return Presentation;
      default:
        return BookOpen;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/courses"
            className="inline-flex items-center space-x-2 text-blue-100 hover:text-white mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Courses</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {course.category}
                </span>
                <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {course.level}
                </span>
              </div>

              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-blue-100 mb-6">{course.description}</p>

              <div className="flex items-center space-x-6 text-blue-100">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{course.rating}</span>
                  <span>({course.students} students)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>{course.students} enrolled</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-gray-900">${course.price}</span>
                </div>

                {user ? (
                  isCompleted ? (
                    <div className="space-y-3">
                      <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Course Completed</span>
                      </div>
                      <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                        <Award className="h-5 w-5" />
                        <span>Download Certificate</span>
                      </button>
                    </div>
                  ) : isEnrolled ? (
                    <div className="space-y-3">
                      <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">You're enrolled!</span>
                      </div>
                      <Link
                        to={`/exam/${course.id}`}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <Play className="h-5 w-5" />
                        <span>Continue Learning</span>
                      </Link>
                    </div>
                  ) : (
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                      Enroll Now
                    </button>
                  )
                ) : (
                  <div className="space-y-3">
                    <Link
                      to="/register"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 block text-center"
                    >
                      Sign up to Enroll
                    </Link>
                    <Link
                      to="/login"
                      className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:border-blue-500 hover:text-blue-600 transition-all duration-200 block text-center"
                    >
                      Already have an account? Sign in
                    </Link>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3">This course includes:</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <Video className="h-4 w-4" />
                      <span>12 hours of video content</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span>Downloadable resources</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Award className="h-4 w-4" />
                      <span>Certificate of completion</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Lifetime access</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Overview</h2>
                  <p className="text-gray-600 leading-relaxed">{course.description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">What you'll learn</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.syllabus.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Course Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
                <div className="space-y-4">
                  {course.syllabus.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                            <span className="text-sm font-medium">{index + 1}</span>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{item}</h3>
                            <p className="text-sm text-gray-600">Duration: {Math.floor(Math.random() * 30) + 15} minutes</p>
                          </div>
                        </div>
                        {isEnrolled && (
                          <Play className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'materials' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Materials</h2>
                {isEnrolled ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {course.materials.map((material) => {
                      const Icon = getFileIcon(material.type);
                      return (
                        <div key={material.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors duration-200">
                          <div className="flex items-center space-x-3 mb-3">
                            <Icon className="h-6 w-6 text-blue-600" />
                            <div>
                              <h3 className="font-medium text-gray-900">{material.title}</h3>
                              <p className="text-sm text-gray-600 capitalize">{material.type}</p>
                            </div>
                          </div>
                          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                            <Download className="h-4 w-4" />
                            <span>Download</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Enroll to Access Materials</h3>
                    <p className="text-gray-600">Course materials are available to enrolled students only</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'instructor' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Meet Your Instructor</h2>
                <div className="flex items-start space-x-6">
                  <img
                    src={course.instructorAvatar}
                    alt={course.instructor}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.instructor}</h3>
                    <p className="text-gray-600 mb-4">
                      Experienced professional with over 10 years in the industry. 
                      Passionate about sharing knowledge and helping students achieve their goals.
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>15 Courses</span>
                      <span>4.9 Rating</span>
                      <span>50K+ Students</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;