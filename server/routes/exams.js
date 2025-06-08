import express from 'express';
import Exam from '../models/Exam.js';
import User from '../models/User.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all exams (Admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const exams = await Exam.find({ isActive: true }).populate('courseId', 'title');
    res.json(exams);
  } catch (error) {
    console.error('Get exams error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get exam by course ID
router.get('/course/:courseId', authenticateToken, async (req, res) => {
  try {
    const exam = await Exam.findOne({ 
      courseId: req.params.courseId, 
      isActive: true 
    }).populate('courseId', 'title');
    
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found for this course' });
    }
    
    res.json(exam);
  } catch (error) {
    console.error('Get exam by course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create exam (Admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const exam = new Exam(req.body);
    await exam.save();
    res.status(201).json(exam);
  } catch (error) {
    console.error('Create exam error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update exam (Admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    
    res.json(exam);
  } catch (error) {
    console.error('Update exam error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete exam (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    
    res.json({ message: 'Exam deleted successfully' });
  } catch (error) {
    console.error('Delete exam error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit exam answers
router.post('/:id/submit', authenticateToken, async (req, res) => {
  try {
    const examId = req.params.id;
    const { answers } = req.body;
    const userId = req.user.userId;

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    // Calculate score
    let correctAnswers = 0;
    const answerDetails = [];

    exam.questions.forEach((question, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) correctAnswers++;
      
      answerDetails.push({
        questionId: question._id,
        selectedAnswer: userAnswer
      });
    });

    const score = Math.round((correctAnswers / exam.questions.length) * 100);

    // Save result to user
    const user = await User.findById(userId);
    user.examResults.push({
      examId,
      score,
      answers: answerDetails
    });
    await user.save();

    res.json({
      score,
      correctAnswers,
      totalQuestions: exam.questions.length,
      passed: score >= 60
    });
  } catch (error) {
    console.error('Submit exam error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;