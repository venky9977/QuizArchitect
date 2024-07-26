import Quiz from '@/app/models/QuizSchema';
import { connectToDB } from '../../../../libs/mongoDB';
import { NextResponse } from 'next/server';

export async function POST(request) {
    await connectToDB();
    try {
        const { quizTitle, icon, quizQuestions } = await request.json();
        const newQuiz = await Quiz.create({ quizTitle, icon, quizQuestions });
        return NextResponse.json({
            id: newQuiz._id,
            message: 'The quiz has been created successfully.',
        });
    } catch (error) {
        return NextResponse.json({ message: error.message });
    }
}

export async function GET() {
    await connectToDB();
    try {
        const quizzes = await Quiz.find();
        return NextResponse.json({ quizzes });
    } catch (error) {
        return NextResponse.json({ message: error.message });
    }
}

export async function PUT(request) {
    await connectToDB();
    try {
        const id = request.nextUrl.searchParams.get('id');
        let quizToUpdate = await Quiz.findById(id);

        const { updateQuiz, updateQuizQuestions } = await request.json();
        if (updateQuiz) {
            quizToUpdate.icon = updateQuiz.icon;
            quizToUpdate.quizTitle = updateQuiz.quizTitle;
            quizToUpdate.quizQuestions = updateQuiz.quizQuestions;
        }

        if (updateQuizQuestions) {
            quizToUpdate.quizQuestions = updateQuizQuestions;
        }

        await quizToUpdate.save();
        return NextResponse.json({ message: 'success' });
    } catch (error) {
        return NextResponse.json({ message: error.message });
    }
}

export async function DELETE(request) {
    await connectToDB();
    try {
        const id = request.nextUrl.searchParams.get('id');
        await Quiz.findByIdAndDelete(id);
        return NextResponse.json({ message: 'quiz deleted' });
    } catch (error) {
        return NextResponse.json({ message: error.message });
    }
}
