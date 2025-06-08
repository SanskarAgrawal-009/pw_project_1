import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import CourseManagement from './pages/admin/CourseManagement';
import StudentManagement from './pages/admin/StudentManagement';
import ExamManagement from './pages/admin/ExamManagement';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import ExamPage from './pages/ExamPage';
import Profile from './pages/Profile';
import { AuthProvider, useAuth } from './context/AuthContext';
import { mockUser } from './data/mockData';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <Navbar />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              user ? (
                user.role === 'admin' ? <AdminDashboard /> : <Dashboard />
              ) : <Navigate to="/login" />
            } />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/exam/:courseId" element={user ? <ExamPage /> : <Navigate to="/login" />} />
            
            {/* Admin Routes */}
            <Route path="/admin/courses" element={
              user?.role === 'admin' ? <CourseManagement /> : <Navigate to="/login" />
            } />
            <Route path="/admin/students" element={
              user?.role === 'admin' ? <StudentManagement /> : <Navigate to="/login" />
            } />
            <Route path="/admin/exams" element={
              user?.role === 'admin' ? <ExamManagement /> : <Navigate to="/login" />
            } />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;