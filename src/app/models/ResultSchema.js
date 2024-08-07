// src/models/ResultSchema.js

import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
    quizTitle: { type: String, required: true },
    name: { type: String, required: true },
    score: { type: Number, required: true },
    date: { type: String, required: true },
});

const Result = mongoose.models.Result || mongoose.model('Result', resultSchema);

export default Result;
