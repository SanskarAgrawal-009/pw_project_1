import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Course from './models/Course.js';
import Exam from './models/Exam.js';

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/elearning');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Exam.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const admin = new User({
      name: 'Admin User',
      email: 'admin@elearning.com',
      password: 'admin123',
      role: 'admin',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=150&h=150&fit=crop&crop=face'
    });
    await admin.save();

    // Create student user
    const student = new User({
      name: 'John Doe',
      email: 'student@elearning.com',
      password: 'student123',
      role: 'student',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150&h=150&fit=crop&crop=face'
    });
    await student.save();

    // Create courses
    const courses = [
      {
        title: 'Complete Web Development Bootcamp',
        description: 'Learn full-stack web development from scratch with HTML, CSS, JavaScript, React, Node.js, and MongoDB.',
        instructor: 'Sarah Johnson',
        instructorAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=150&h=150&fit=crop&crop=face',
        duration: '12 weeks',
        level: 'Beginner',
        price: 299,
        rating: 4.8,
        students: 1234,
        image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?w=800&h=400&fit=crop',
        category: 'Web Development',
        tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
        materials: [
          { title: 'Introduction to HTML', type: 'video', url: '#' },
          { title: 'CSS Fundamentals', type: 'pdf', url: '#' },
          { title: 'JavaScript Basics', type: 'video', url: '#' },
          { title: 'React Components', type: 'ppt', url: '#' }
        ],
        syllabus: [
          'HTML5 & CSS3 Fundamentals',
          'JavaScript ES6+ Features',
          'React.js Development',
          'Node.js & Express',
          'Database Design with MongoDB',
          'Deployment & DevOps'
        ]
      },
      {
        title: 'Data Science with Python',
        description: 'Master data science concepts using Python, pandas, numpy, matplotlib, and machine learning libraries.',
        instructor: 'Dr. Michael Chen',
        instructorAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=150&h=150&fit=crop&crop=face',
        duration: '16 weeks',
        level: 'Intermediate',
        price: 399,
        rating: 4.9,
        students: 892,
        image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?w=800&h=400&fit=crop',
        category: 'Data Science',
        tags: ['Python', 'Pandas', 'Machine Learning', 'Statistics'],
        materials: [
          { title: 'Python for Data Science', type: 'video', url: '#' },
          { title: 'Statistics Handbook', type: 'pdf', url: '#' },
          { title: 'ML Algorithms Overview', type: 'ppt', url: '#' }
        ],
        syllabus: [
          'Python Programming Fundamentals',
          'Data Manipulation with Pandas',
          'Data Visualization',
          'Statistical Analysis',
          'Machine Learning Algorithms',
          'Deep Learning Basics'
        ]
      },
      {
        title: 'Digital Marketing Mastery',
        description: 'Complete guide to digital marketing including SEO, social media, content marketing, and analytics.',
        instructor: 'Emma Rodriguez',
        instructorAvatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?w=150&h=150&fit=crop&crop=face',
        duration: '8 weeks',
        level: 'Beginner',
        price: 199,
        rating: 4.7,
        students: 2156,
        image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?w=800&h=400&fit=crop',
        category: 'Marketing',
        tags: ['SEO', 'Social Media', 'Content Marketing', 'Analytics'],
        materials: [
          { title: 'SEO Fundamentals', type: 'video', url: '#' },
          { title: 'Social Media Strategy Guide', type: 'pdf', url: '#' }
        ],
        syllabus: [
          'Digital Marketing Overview',
          'Search Engine Optimization',
          'Social Media Marketing',
          'Content Marketing Strategy',
          'Email Marketing',
          'Analytics & Reporting'
        ]
      }
    ];

    const savedCourses = await Course.insertMany(courses);
    console.log('Created courses');

    // Enroll student in some courses
    student.enrolledCourses = [savedCourses[0]._id, savedCourses[1]._id];
    student.completedCourses = [savedCourses[2]._id];
    await student.save();

    // Create exams
    const exams = [
      {
        courseId: savedCourses[0]._id,
        title: 'Web Development Fundamentals Quiz',
        description: 'Test your knowledge of HTML, CSS, and JavaScript basics',
        duration: 30,
        questions: [
          {
            question: 'What does HTML stand for?',
            options: [
              'Hyper Text Markup Language',
              'High Tech Modern Language',
              'Home Tool Markup Language',
              'Hyperlink and Text Markup Language'
            ],
            correctAnswer: 0
          },
          {
            question: 'Which CSS property is used to change the text color?',
            options: ['color', 'text-color', 'font-color', 'text-style'],
            correctAnswer: 0
          },
          {
            question: 'What is the correct way to declare a JavaScript variable?',
            options: ['var myVar;', 'variable myVar;', 'v myVar;', 'declare myVar;'],
            correctAnswer: 0
          }
        ]
      }
    ];

    await Exam.insertMany(exams);
    console.log('Created exams');

    console.log('Seed data created successfully!');
    console.log('Admin credentials: admin@elearning.com / admin123');
    console.log('Student credentials: student@elearning.com / student123');
    
    process.exit(0);
  } catch (error) {
    console.error('Seed data error:', error);
    process.exit(1);
  }
};

seedData();