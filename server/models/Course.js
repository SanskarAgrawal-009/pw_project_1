import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['video', 'pdf', 'ppt', 'doc'],
    required: true
  },
  url: {
    type: String,
    required: true
  },
  filename: String,
  size: Number
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true
  },
  instructorAvatar: {
    type: String,
    default: ''
  },
  duration: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  students: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true
  },
  tags: [String],
  materials: [materialSchema],
  syllabus: [String],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Course', courseSchema);