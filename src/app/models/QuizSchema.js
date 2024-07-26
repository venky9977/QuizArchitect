import mongoose from 'mongoose';
const { Schema } = mongoose;

const quizSchema = new Schema({
    quizTitle: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    quizQuestions: [{
        mainQuestion: {
            type: String,
            required: true,
        },
        choices: [{
            type: String,
            required: true,
        }],
        correctAnswer: {
            type: Number,
            required: true,
        },
        answeredResult: {
            type: Number,
            default: -1,
        },
        statistics: {
            totalAttempts: {
                type: Number,
                default: 0,
            },
            correctAttempts: {
                type: Number,
                default: 0,
            },
            incorrectAttempts: {
                type: Number,
                default: 0,
            },
        },
    }],
});

const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);
export default Quiz;
