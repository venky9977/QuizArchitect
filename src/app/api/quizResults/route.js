// src/app/api/quizResults/route.js

import Result from '../../models/ResultSchema';
import { connectToDB } from '../../../../libs/mongoDB';
import { NextResponse } from 'next/server';

export async function POST(request) {
    await connectToDB();
    try {
        const { quizTitle, name, score, date } = await request.json();
        const newResult = await Result.create({ quizTitle, name, score, date });
        return NextResponse.json({
            message: 'Result saved successfully.',
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function GET() {
    await connectToDB();
    try {
        const results = await Result.find();
        return NextResponse.json({ results }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
