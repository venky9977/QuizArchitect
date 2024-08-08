// QuizBuildNav.js
'use client';

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import convertFromFaToText from "../../convertFromFaToText";
import useGlobalContextProvider from "../../ContextApi";

function validateQuizQuestions(quizQuestions) {
    for (let question of quizQuestions) {
        if (!question.mainQuestion.trim()) {
            return { valid: false, message: 'Please fill in the main question.' };
        }
        if (question.choices.some((choice) => !choice.text.trim())) {
            return { valid: false, message: 'Please fill in all the choices.' };
        }
        const validAnswers = ['A', 'B', 'C', 'D'];
        if (!validAnswers.includes(question.correctAnswer.toUpperCase())) {
            return { valid: false, message: 'Please specify the correct answer as A, B, C, or D.' };
        }
    }
    return { valid: true };
}

function QuizBuildNav({ newQuiz, setNewQuiz }) {
    const { allQuizzes, setAllQuizzes, selectedQuizObject } = useGlobalContextProvider();
    const { selectedQuiz, setSelectedQuiz } = selectedQuizObject;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function createNewQuiz() {
        try {
            setIsLoading(true);
            const textIcon = convertFromFaToText(newQuiz.icon);
            const quizWithTextIcon = { ...newQuiz, icon: textIcon };

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/quizzes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(quizWithTextIcon),
            });

            if (!res.ok) {
                const errorResponse = await res.json();
                toast.error(`Failed to create a new quiz: ${errorResponse.message}`);
                setIsLoading(false);
                return;
            }

            const { id } = await res.json();
            const updatedQuiz = { ...newQuiz, _id: id, icon: textIcon };
            setAllQuizzes([...allQuizzes, updatedQuiz]);

            toast.success('The quiz has been created successfully');
        } catch (error) {
            toast.error('An error occurred while creating the quiz');
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function saveQuiz() {
        if (newQuiz.quizTitle.trim().length === 0) {
            return toast.error('Please add a name for the quiz.');
        }

        const isValid = validateQuizQuestions(newQuiz.quizQuestions);
        if (!isValid.valid) {
            return toast.error(isValid.message);
        }

        if (selectedQuiz) {
            const updatedQuiz = [...allQuizzes];
            const findIndexQuiz = updatedQuiz.findIndex(quiz => quiz._id === newQuiz._id);

            if (findIndexQuiz !== -1) {
                updatedQuiz[findIndexQuiz] = newQuiz;
            }
            const id = updatedQuiz[findIndexQuiz]._id;
            const convertIconText = convertFromFaToText(updatedQuiz[findIndexQuiz].icon);
            updatedQuiz[findIndexQuiz].icon = convertIconText;

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/quizzes?id=${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ updateQuiz: updatedQuiz[findIndexQuiz] }),
                });

                if (!res.ok) {
                    const errorResponse = await res.json();
                    throw new Error(errorResponse.message || 'Failed to update quiz');
                }

                toast.success('The quiz has been saved successfully.');
                setAllQuizzes(updatedQuiz);
            } catch (error) {
                toast.error(`Failed to update quiz: ${error.message}`);
                console.log(error);
            }
        } else {
            await createNewQuiz();
        }

        router.push('/quizzes');
    }

    return (
        <div className="poppins mx-12 my-12 flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <Image src="/quizapp_icon.png" alt="Quiz App Icon" height={50} width={50} />
                <span className="text-2xl">
                    Quiz <span className="text-green-700 font-bold">Builder</span>
                </span>
            </div>
            <button
                onClick={saveQuiz}
                className="p-2 px-4 bg-green-700 rounded-md text-white"
                disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save'}
            </button>
        </div>
    );
}

export default QuizBuildNav;
