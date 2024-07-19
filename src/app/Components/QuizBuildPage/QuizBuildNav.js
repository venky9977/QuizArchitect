<<<<<<< Updated upstream
import React from "react";
import Image from "next/image";

function QuizBuildNav() {
=======
'use client';

import React, {useEffect, useState} from "react";
import Image from "next/image";
import useGlobalContextProvider from '@/app/ContextApi';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { faCode } from "@fortawesome/free-solid-svg-icons";

function validateQuizQuestions(quizQuestions){
    for(let question of quizQuestions){
        // check if the main question is empty
        if(!question.mainQuestion.trim()){
            return { valid: false, message: 'Please fill in the main question.'};
        }

        // Check if any choice is empty
        if(question.choices.some((choice) => !choice.trim().substring(2))){
            return { valid: false, message: 'Please fill in all the choices.'};
        }

        // Check if the correct answer is empty
        if (question.correctAnswer.length === 0){
            return { valid: false, message: 'Please specify the correct answer.'};
        }
    }
    return {valid: true};
}

function QuizBuildNav({ newQuiz }) {
    const { allQuizzes, setAllQuizzes } = useGlobalContextProvider();
    const router = useRouter();
    
    function addNewQuiz(){
        console.log('New Quiz:', newQuiz);
        if(!newQuiz.quizTitle || newQuiz.quizTitle.trim().length === 0){
            return toast.error('Please add a name for the quiz.');
        }

        // setAllQuizzes([...allQuizzes, newQuiz]);
        // router.push('/');
        
        const isValid = validateQuizQuestions(newQuiz.quizQuestions);
        if(isValid.valid === false){
            toast.error(isValid.message);
            return;
        }
    }

    console.log(allQuizzes);
>>>>>>> Stashed changes
    return (
        <div className="poppins mx-12 my-12 flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <Image src="/quizapp_icon.png" alt="" height={50} width={50} />
                <span className="text-2xl">
                    Quiz <span className="text-green-700 font-bold">Builder</span>
                </span>
            </div>
            <button
                onClick={() => {
                    addNewQuiz();
                }}
                className="p-2 px-4 bg-green-700 rounded-md text-white">
                Save
            </button>
        </div>
    );
}

export default QuizBuildNav;