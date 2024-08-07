// src/app/models/QuizSchema.js

import mongoose from 'mongoose';

const choiceSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isImage: { type: Boolean, default: false },
});

const questionSchema = new mongoose.Schema({
  mainQuestion: { type: String, required: true },
  choices: [choiceSchema],
  correctAnswer: { type: String, required: true },
  answeredResult: { type: String, default: '' },
  statistics: {
    totalAttempts: { type: Number, default: 0 },
    correctAttempts: { type: Number, default: 0 },
    incorrectAttempts: { type: Number, default: 0 },
  },
});

const quizSchema = new mongoose.Schema({
  quizTitle: { type: String, required: true },
  icon: { type: String, required: true },
  quizQuestions: [questionSchema],
});

const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);

export default Quiz;
