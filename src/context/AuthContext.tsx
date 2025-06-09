import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
  avatar?: string;
  enrolledCourses?: string[];
  completedCourses?: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: 'admin' | 'student') => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users database
const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@elearning.com',
    password: 'admin123',
    role: 'admin' as const,
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'student@elearning.com',
    password: 'student123',
    role: 'student' as const,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150&h=150&fit=crop&crop=face',
    enrolledCourses: ['1', '2'],
    completedCourses: ['3']
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock database
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const userData: User = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
          avatar: foundUser.avatar,
          enrolledCourses: foundUser.enrolledCourses || [],
          completedCourses: foundUser.completedCourses || []
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string, role: 'admin' | 'student'): Promise<boolean> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        return false;
      }
      
      // Create new user
      const newUser: User = {
        id: (mockUsers.length + 1).toString(),
        name,
        email,
        role,
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150&h=150&fit=crop&crop=face',
        enrolledCourses: [],
        completedCourses: []
      };
      
      // Add to mock database (in real app, this would be saved to backend)
      mockUsers.push({
        ...newUser,
        password
      });
      
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};