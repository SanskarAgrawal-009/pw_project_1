export const mockUser = {
  admin: {
    id: '1',
    name: 'Admin User',
    email: 'admin@elearning.com',
    role: 'admin' as const,
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=150&h=150&fit=crop&crop=face'
  },
  student: {
    id: '2',
    name: 'John Doe',
    email: 'student@elearning.com',
    role: 'student' as const,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150&h=150&fit=crop&crop=face',
    enrolledCourses: ['1', '2'],
    completedCourses: ['3']
  }
};

export const mockCourses = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn full-stack web development from scratch with HTML, CSS, JavaScript, React, Node.js, and MongoDB.',
    instructor: 'Sarah Johnson',
    instructorAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=150&h=150&fit=crop&crop=face',
    duration: '12 weeks',
    level: 'Beginner to Advanced',
    price: 299,
    rating: 4.8,
    students: 1234,
    image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?w=800&h=400&fit=crop',
    category: 'Web Development',
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
    materials: [
      { id: '1', title: 'Introduction to HTML', type: 'video', url: '#' },
      { id: '2', title: 'CSS Fundamentals', type: 'pdf', url: '#' },
      { id: '3', title: 'JavaScript Basics', type: 'video', url: '#' },
      { id: '4', title: 'React Components', type: 'ppt', url: '#' }
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
    id: '2',
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
      { id: '1', title: 'Python for Data Science', type: 'video', url: '#' },
      { id: '2', title: 'Statistics Handbook', type: 'pdf', url: '#' },
      { id: '3', title: 'ML Algorithms Overview', type: 'ppt', url: '#' }
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
    id: '3',
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
      { id: '1', title: 'SEO Fundamentals', type: 'video', url: '#' },
      { id: '2', title: 'Social Media Strategy Guide', type: 'pdf', url: '#' }
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

export const mockExams = [
  {
    id: '1',
    courseId: '1',
    title: 'Web Development Fundamentals Quiz',
    description: 'Test your knowledge of HTML, CSS, and JavaScript basics',
    duration: 30,
    totalQuestions: 10,
    questions: [
      {
        id: '1',
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
        id: '2',
        question: 'Which CSS property is used to change the text color?',
        options: ['color', 'text-color', 'font-color', 'text-style'],
        correctAnswer: 0
      },
      {
        id: '3',
        question: 'What is the correct way to declare a JavaScript variable?',
        options: ['var myVar;', 'variable myVar;', 'v myVar;', 'declare myVar;'],
        correctAnswer: 0
      }
    ]
  }
];

export const mockStudents = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    enrolledCourses: ['1', '2'],
    completedCourses: ['3'],
    joinDate: '2024-01-15',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    enrolledCourses: ['1'],
    completedCourses: [],
    joinDate: '2024-02-20',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@example.com',
    enrolledCourses: ['2', '3'],
    completedCourses: ['1'],
    joinDate: '2024-01-08',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?w=150&h=150&fit=crop&crop=face'
  }
];