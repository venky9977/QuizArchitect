// Path: app/api/quizzes/route.js

import Quiz from '../../models/QuizSchema';
import { connectToDB } from '../../../../libs/mongoDB';
import { NextResponse } from 'next/server';

export async function POST(request) {
    await connectToDB();
    try {
        const { quizTitle, icon, quizQuestions } = await request.json();
        const formattedQuizQuestions = quizQuestions.map(q => ({
            ...q,
            correctAnswer: q.correctAnswer.toUpperCase(), // Ensure correct answer is uppercase
        }));
        const newQuiz = await Quiz.create({ quizTitle, icon, quizQuestions: formattedQuizQuestions });
        return NextResponse.json({
            id: newQuiz._id,
            message: 'The quiz has been created successfully.',
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function GET() {
    await connectToDB();
    try {
        const quizzes = await Quiz.find();
        return NextResponse.json({ quizzes }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    await connectToDB();
    try {
        const id = request.nextUrl.searchParams.get('id');
        if (!id) {
            return NextResponse.json({ message: 'Quiz ID is required' }, { status: 400 });
        }

        let quizToUpdate = await Quiz.findById(id);
        if (!quizToUpdate) {
            return NextResponse.json({ message: 'Quiz not found' }, { status: 404 });
        }

        const { updateQuiz, updateQuizQuestions } = await request.json();
        if (updateQuiz) {
            quizToUpdate.icon = updateQuiz.icon;
            quizToUpdate.quizTitle = updateQuiz.quizTitle;
            quizToUpdate.quizQuestions = updateQuiz.quizQuestions.map(q => ({
                ...q,
                correctAnswer: q.correctAnswer.toUpperCase(), // Ensure correct answer is uppercase
            }));
        }

        if (updateQuizQuestions) {
            quizToUpdate.quizQuestions = updateQuizQuestions.map(q => ({
                ...q,
                correctAnswer: q.correctAnswer.toUpperCase(), // Ensure correct answer is uppercase
            }));
        }

        await quizToUpdate.save();
        return NextResponse.json({ message: 'success' }, { status: 200 });
    } catch (error) {
        console.error('Error updating quiz:', error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    await connectToDB();
    try {
        const id = request.nextUrl.searchParams.get('id');
        if (!id) {
            return NextResponse.json({ message: 'Quiz ID is required' }, { status: 400 });
        }

        const deletedQuiz = await Quiz.findByIdAndDelete(id);
        if (!deletedQuiz) {
            return NextResponse.json({ message: 'Quiz not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Quiz deleted' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
