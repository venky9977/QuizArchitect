'use client';

import React, { useEffect, useReducer, useState } from 'react';
import useGlobalContextProvider from '@/app/ContextApi';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';

function QuizStartQuestions({ onUpdateTime }) {
    const time = 15;
    const { quizToStartObject, allQuizzes, setAllQuizzes, userObject } = useGlobalContextProvider();
    const { selectQuizToStart } = quizToStartObject;
    const { quizQuestions } = selectQuizToStart;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [indexOfQuizSelected, setIndexOfQuizSelected] = useState(null);
    const [isQuizEnded, setIsQuizEnded] = useState(false);
    const [score, setScore] = useState(0);
    const { user, setUser } = userObject;

    const [timer, setTimer] = useState(time);

    let interval;

    function startTimer() {
        clearInterval(interval);
        setTimer(time);

        interval = setInterval(() => {
            setTimer((currentTime) => {
                onUpdateTime(currentTime);
                if (currentTime === 0) {
                    clearInterval(interval);
                    return 0;
                }
                return currentTime - 1;
            });
        }, 1000);
    }

    async function saveDataIntoDB() {
        try {
            const id = selectQuizToStart._id;
            const res = await fetch(
                `http://localhost:3000/api/quizzes?id=${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        updateQuizQuestions: allQuizzes[indexOfQuizSelected].quizQuestions,
                    }),
                },
            );
            if (!res.ok) {
                toast.error('Something went wrong while saving....');
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        startTimer();
        return () => {
            clearInterval(interval);
        };
    }, [currentQuestionIndex]);

    useEffect(() => {
        if (timer === 0 && !isQuizEnded) {
            const currentQuizzes = [...allQuizzes];
            currentQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex].statistics.totalAttempts += 1;
            currentQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex].statistics.incorrectAttempts += 1;

            setAllQuizzes(currentQuizzes);
            if (currentQuestionIndex !== quizQuestions.length - 1) {
                setTimeout(() => {
                    setCurrentQuestionIndex((current) => current + 1);
                }, 1000);
            } else {
                setIsQuizEnded(true);
                clearInterval(interval);
            }
        }
    }, [timer]);

    useEffect(() => {
        const quizIndexFound = allQuizzes.findIndex(
            (quiz) => quiz._id === selectQuizToStart._id,
        );
        setIndexOfQuizSelected(quizIndexFound);
    }, []);

    useEffect(() => {
        if (isQuizEnded) {
            quizQuestions.forEach((quizQuestion) => {
                quizQuestion.answeredResult = -1;
            });
            saveDataIntoDB();
        }
    }, [isQuizEnded]);

    function selectChoiceFunction(choiceIndexClicked) {
        setSelectedChoice(choiceIndexClicked);

        const currentAllQuizzes = [...allQuizzes];
        currentAllQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex].answeredResult = choiceIndexClicked;
        setAllQuizzes(currentAllQuizzes);
    }

    function moveToTheNextQuestion() {
        if (allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex].answeredResult === -1) {
            toast.error('Please select an answer.');
            return;
        }

        allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex].statistics.totalAttempts += 1;

        if (allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex].answeredResult !== allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex].correctAnswer) {
            allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex].statistics.incorrectAttempts += 1;
            toast.error('Incorrect Answer');

            if (currentQuestionIndex != quizQuestions.length - 1) {
                setTimeout(() => {
                    setCurrentQuestionIndex((current) => current + 1);
                    setSelectedChoice(null);
                }, 1200);
            } else {
                setTimer(0);
                clearInterval(interval);
                setIsQuizEnded(true);
            }

            return;
        }

        allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex].statistics.correctAttempts += 1;
        setScore((prevState) => prevState + 1);
        toast.success('Answer is Correct');

        if (currentQuestionIndex === quizQuestions.length - 1 && allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex].answeredResult === allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex].correctAnswer) {
            setTimer(0);
            clearInterval(interval);
            setIsQuizEnded(true);
            return;
        }

        setTimeout(() => {
            setCurrentQuestionIndex((current) => current + 1);
            setSelectedChoice(null);
        }, 2000);
    }

    return (
        <div className="relative poppins rounded-sm m-9 w-9/12">
            <Toaster
                toastOptions={{
                    className: '',
                    duration: 1500,
                    style: {
                        padding: '12px',
                    },
                }}
            />
            <div className="flex items-center gap-2">
                <div className="bg-blue-700 flex justify-center items-center rounded-md w-11 h-11 text-white p-3">
                    {currentQuestionIndex + 1}
                </div>
                <p>
                    {quizQuestions[currentQuestionIndex].mainQuestion}
                </p>
            </div>
            <div className="mt-7 flex flex-col gap-2">
                {quizQuestions[currentQuestionIndex].choices.map(
                    (choice, indexChoice) => (
                        <div
                            key={indexChoice}
                            onClick={() => {
                                selectChoiceFunction(indexChoice);
                            }}
                            className={`p-3 ml-11 w-10/12 border border-blue-700 rounded-md hover:bg-blue-700 hover:text-white transition-all select-none ${selectedChoice === indexChoice ? 'bg-blue-700 text-white' : 'bg-white'}`}
                        >
                            {choice}
                        </div>
                    ),
                )}
            </div>
            <div className="flex justify-end mt-7">
                <button
                    onClick={() => {
                        moveToTheNextQuestion();
                    }}
                    disabled={isQuizEnded ? true : false}
                    className={`p-2 px-5 text-[15px] text-white rounded-md bg-blue-700 mr-[70px] ${isQuizEnded ? 'opacity-60' : 'opacity-100'}`}
                >
                    SUBMIT
                </button>
            </div>
            {isQuizEnded && (
                <ScoreComponent
                    quizStartParentProps={{
                        setIsQuizEnded,
                        setIndexOfQuizSelected,
                        setCurrentQuestionIndex,
                        setSelectedChoice,
                        score,
                        setScore,
                    }}
                />
            )}
        </div>
    );
}

export default QuizStartQuestions;

function ScoreComponent({ quizStartParentProps }) {
    const { quizToStartObject, allQuizzes } = useGlobalContextProvider();
    const { selectQuizToStart } = quizToStartObject;
    const numberOfQuestions = selectQuizToStart.quizQuestions.length;
    const router = useRouter();

    const {
        setIsQuizEnded,
        setIndexOfQuizSelected,
        setCurrentQuestionIndex,
        setSelectedChoice,
        setScore,
        score,
    } = quizStartParentProps;

    function emojiIconScore() {
        const emojiFaces = [
            'confused-emoji.jpg',
            'happy-emoji.jpg',
            'star-eyes-emoji.jpg'
        ];
        const result = (score / selectQuizToStart.quizQuestions.length) * 100;
        if (result < 25) {
            return emojiFaces[0];
        }

        if (result === 50) {
            return emojiFaces[1];
        }

        return emojiFaces[2];
    }

    function exitQuizFunction() {
        router.push('/');
    }

    return (
        <div className="flex items-center justify-center rounded-md top-[-100px] border border-gray-400">
            <div className="flex gap-4 items-center justify-center flex-col">
                <Image src={`/${emojiIconScore()}`} alt="" width={100} height={100} />
                <div className='flex gap-1 flex-col'>
                    <span className='font-bold text-2xl'>Your Score</span>
                    <div className='text-[-22px] text-center'>
                        {score}/{numberOfQuestions}
                    </div>
                </div>
                <button
                    onClick={() => exitQuizFunction()}
                    className='p-2 bg-blue-700 rounded-md text-white px-6'
                >
                    Exit Quiz
                </button>
                <div className='w-full flex gap-2 flex-col mt-3'>
                    <div className='flex gap-1 items-center justify-center'>
                        <Image src="/correct-answer.png" alt="" width={20} height={20} />
                        <span className='text-[14px]'>Correct Answers: {score}</span>
                    </div>
                    <div className='flex gap-1 items-center justify-center'>
                        <Image src="/incorrect-answer.png" alt="" width={20} height={20} />
                        <span className='text-[14px]'>
                            Incorrect Answers:
                            {selectQuizToStart.quizQuestions.length - score}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
