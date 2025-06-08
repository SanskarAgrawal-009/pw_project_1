import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { mockExams, mockCourses } from '../data/mockData';

const ExamPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [score, setScore] = useState(0);

  const exam = mockExams.find(e => e.courseId === courseId);
  const course = mockCourses.find(c => c.id === courseId);

  useEffect(() => {
    if (examStarted && timeLeft > 0 && !examFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !examFinished) {
      finishExam();
    }
  }, [timeLeft, examStarted, examFinished]);

  if (!exam || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Exam Not Found</h2>
          <p className="text-gray-600 mb-4">The exam you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

  const finishExam = () => {
    let correctAnswers = 0;
    exam.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / exam.questions.length) * 100);
    setScore(finalScore);
    setExamFinished(true);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return 'Excellent work! You have a strong understanding of the material.';
    if (score >= 60) return 'Good job! Consider reviewing some topics to improve your understanding.';
    return 'Keep studying! Review the course materials and try again.';
  };

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{exam.title}</h1>
              <p className="text-gray-600">{course.title}</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-blue-900 mb-4">Exam Instructions</h2>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 mt-0.5" />
                  <span>Duration: {exam.duration} minutes</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 mt-0.5" />
                  <span>Total Questions: {exam.totalQuestions}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 mt-0.5" />
                  <span>You can navigate between questions but cannot change answers once submitted</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 mt-0.5" />
                  <span>Make sure you have a stable internet connection</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 mt-0.5" />
                  <span>The exam will auto-submit when time runs out</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <button
                onClick={() => setExamStarted(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Start Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (examFinished) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="text-center mb-8">
              <div className="mb-6">
                {score >= 80 ? (
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                ) : (
                  <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto" />
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Exam Complete!</h1>
              <p className="text-gray-600 mb-6">Here are your results for {exam.title}</p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="text-6xl font-bold mb-2">
                  <span className={getScoreColor(score)}>{score}%</span>
                </div>
                <p className="text-gray-600 mb-4">
                  You answered {exam.questions.filter((_, index) => answers[index] === exam.questions[index].correctAnswer).length} out of {exam.questions.length} questions correctly
                </p>
                <p className="text-gray-700">{getScoreMessage(score)}</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => navigate(`/courses/${courseId}`)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  Back to Course
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:border-blue-500 hover:text-blue-600 transition-all duration-200"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestionData = exam.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{exam.title}</h1>
              <p className="text-gray-600">{course.title}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 text-blue-600 mb-1">
                <Clock className="h-5 w-5" />
                <span className="text-xl font-mono font-bold">{formatTime(timeLeft)}</span>
              </div>
              <p className="text-sm text-gray-600">Time Remaining</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {exam.questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / exam.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                Question {currentQuestion + 1}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
              {currentQuestionData.question}
            </h2>
          </div>

          <div className="space-y-4 mb-8">
            {currentQuestionData.options.map((option, index) => (
              <label
                key={index}
                className={`block p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  answers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={index}
                    checked={answers[currentQuestion] === index}
                    onChange={() => handleAnswerSelect(index)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-900">{option}</span>
                </div>
              </label>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              disabled={currentQuestion === 0}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-4">
              {currentQuestion === exam.questions.length - 1 ? (
                <button
                  onClick={finishExam}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
                >
                  Submit Exam
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <span>Next</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Question Navigator */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Question Navigator</h3>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {exam.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                  index === currentQuestion
                    ? 'bg-blue-600 text-white'
                    : answers[index] !== undefined
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPage;