import React, { useState } from 'react';
import { Camera, Edit, Save, X, Mail, Phone, MapPin, Calendar, Award, BookOpen, Trophy, Target } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockCourses } from '../data/mockData';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: 'Passionate learner focused on advancing my skills in technology and design.',
    website: 'https://johndoe.dev',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe'
  });

  const [activeTab, setActiveTab] = useState('overview');

  const enrolledCourses = mockCourses.filter(course => 
    user?.enrolledCourses?.includes(course.id)
  );

  const completedCourses = mockCourses.filter(course => 
    user?.completedCourses?.includes(course.id)
  );

  const achievements = [
    {
      id: 1,
      title: 'First Course Completed',
      description: 'Completed your first course on the platform',
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      earned: true,
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Quick Learner',
      description: 'Completed a course in under 2 weeks',
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      earned: true,
      date: '2024-01-28'
    },
    {
      id: 3,
      title: 'Knowledge Seeker',
      description: 'Enrolled in 5 or more courses',
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      earned: false,
      date: null
    },
    {
      id: 4,
      title: 'Master Student',
      description: 'Completed 10 courses with 90%+ scores',
      icon: Award,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      earned: false,
      date: null
    }
  ];

  const stats = [
    { label: 'Courses Enrolled', value: enrolledCourses.length, icon: BookOpen },
    { label: 'Courses Completed', value: completedCourses.length, icon: Trophy },
    { label: 'Certificates Earned', value: completedCourses.length, icon: Award },
    { label: 'Study Hours', value: '48h', icon: Target }
  ];

  const handleSave = () => {
    // In a real app, this would save to the backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      bio: 'Passionate learner focused on advancing my skills in technology and design.',
      website: 'https://johndoe.dev',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe'
    });
    setIsEditing(false);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'courses', label: 'My Courses' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="relative">
            {/* Cover Image */}
            <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-xl"></div>
            
            {/* Profile Info */}
            <div className="relative px-6 pb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
                {/* Avatar */}
                <div className="relative -mt-16">
                  <img
                    src={user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150&h=150&fit=crop&crop=face'}
                    alt={user?.name}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                  <button className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                      <p className="text-gray-600">{user?.email}</p>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mt-2">
                        {user?.role}
                      </span>
                    </div>
                    
                    <div className="mt-4 sm:mt-0">
                      {!isEditing ? (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                        >
                          <Edit className="h-4 w-4" />
                          <span>Edit Profile</span>
                        </button>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={handleSave}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
                          >
                            <Save className="h-4 w-4" />
                            <span>Save</span>
                          </button>
                          <button
                            onClick={handleCancel}
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2"
                          >
                            <X className="h-4 w-4" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
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
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
                  {isEditing ? (
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-gray-600">{profileData.bio}</p>
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                        {isEditing ? (
                          <input
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <span className="text-gray-600">{profileData.email}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        {isEditing ? (
                          <input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <span className="text-gray-600">{profileData.phone}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        {isEditing ? (
                          <input
                            type="text"
                            value={profileData.location}
                            onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <span className="text-gray-600">{profileData.location}</span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-600">Joined January 2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="space-y-8">
                {/* Enrolled Courses */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Currently Enrolled ({enrolledCourses.length})</h2>
                  {enrolledCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {enrolledCourses.map((course) => (
                        <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-32 object-cover rounded-lg mb-3"
                          />
                          <h3 className="font-medium text-gray-900 mb-2">{course.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-500">Progress</span>
                              <span className="text-xs text-gray-500">65%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                            </div>
                          </div>
                          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                            Continue Learning
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">You haven't enrolled in any courses yet.</p>
                  )}
                </div>

                {/* Completed Courses */}
                {completedCourses.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Completed Courses ({completedCourses.length})</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {completedCourses.map((course) => (
                        <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-32 object-cover rounded-lg mb-3"
                          />
                          <h3 className="font-medium text-gray-900 mb-2">{course.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-green-600 font-medium">Completed</span>
                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
                              View Certificate
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'achievements' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Achievements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                      <div
                        key={achievement.id}
                        className={`border-2 rounded-lg p-6 transition-all duration-200 ${
                          achievement.earned
                            ? 'border-green-200 bg-green-50'
                            : 'border-gray-200 bg-gray-50 opacity-60'
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`${achievement.bgColor} p-3 rounded-lg`}>
                            <Icon className={`h-6 w-6 ${achievement.color}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                            {achievement.earned && achievement.date && (
                              <p className="text-xs text-green-600 font-medium">
                                Earned on {new Date(achievement.date).toLocaleDateString()}
                              </p>
                            )}
                            {!achievement.earned && (
                              <p className="text-xs text-gray-500">Not yet earned</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Notifications</label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                          <span className="ml-2 text-sm text-gray-700">Course updates and announcements</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                          <span className="ml-2 text-sm text-gray-700">Assignment reminders</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                          <span className="ml-2 text-sm text-gray-700">Marketing emails</span>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Privacy Settings</label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                          <span className="ml-2 text-sm text-gray-700">Show my profile to other students</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                          <span className="ml-2 text-sm text-gray-700">Allow direct messages from instructors</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Security</h2>
                  <div className="space-y-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Change Password
                    </button>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200">
                      Deactivate Account
                    </button>
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

export default Profile;