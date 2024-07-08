'use client';

import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from "next/image";
import { faCode, faEllipsis, faPlay } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import useGlobalContextProvider from "../ContextApi";

function successRate(singleQuiz){
    let correctQuestions = 0;
    let totalAttempts = 0;
    let successRate = 0;

    singleQuiz.quizQuestions.forEach((question) => {
        totalAttempts += question.statistics.totalAttempts;
        correctQuestions += question.statistics.correctAttempts;        
    });

    successRate = Math.ceil((correctQuestions / totalAttempts) * 100);
    return successRate;
}

function QuizCard({singleQuiz}){
    const {quizToStartObject } = useGlobalContextProvider();
    const {setSelectQuizToStart } = quizToStartObject;
    const { quizTitle, quizQuestions, icon } = singleQuiz;
    const totalQuestions = quizQuestions.length;
    const globalSuccessRate = successRate(singleQuiz);

    return(
        <div className="rounded-[10px] flex flex-col gap-2 border border-gray-300 bg-white p-4">
            {/* Image container */}
            <div className="relative bg-green-700 w-full h-32 flex justify-center items-center rounded-md">
                {/* More Options Icon */}
                <div className="absolute cursor-pointer top-3 right-3">
                    <FontAwesomeIcon 
                        className="text-white"
                        height={13}
                        width={13}
                        icon={faEllipsis}
                    />
                </div>
                {/* Quiz icon */}
                    <FontAwesomeIcon 
                        className="text-white"
                        height={120}
                        width={120}
                        icon={icon}
                    />
            </div>
            {/* Title Area  */}
            <h3 className="font-bold">{quizTitle}</h3>
            {/* Questions  */}
            <p className="text-sm font-light">{totalQuestions} question(s)</p>
            {/* Footer Area  */}
            <div className="flex gap-3">
                {/* success rate area */}
                <div className="flex gap-1 items-center">
                    <Image src="/target-icon.png" width={20} height={10} alt="" />
                    <span className="text-[12px]">
                        Success rate: {globalSuccessRate}%
                    </span>
                </div>
                <div
                    onClick={() => {
                        setSelectQuizToStart(singleQuiz);
                    }}
                    className="rounded-full w-7 h-7 bg-green-700 flex items-center justify-center"
                >
                    <Link href="/quiz-start">
                    <FontAwesomeIcon 
                        className="text-white"
                        height={15}
                        width={15}
                        icon={faPlay}
                    />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default QuizCard;