// import React from "react";
// import Image from "next/image";
import useGlobalContextProvider from '@/app/ContextApi';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';

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
    const router = useRouter()
    
    function addNewQuiz(){
        if(newQuiz.quizTitle.trim(' ').length === 0){
            return toast.error('Please add a name for the quiz.');
        }
        
        const isValid = validateQuizQuestions(newQuiz.quizQuestions);
        if(isValid.valid === false){
            toast.error(isValid.message);
            return;
        }


    }

    console.log(allQuizzes);
    return (
        <div className="poppins mx-12 my-12 flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <Image src="/quizapp_icon.png" alt="" height={50} width={50} />
                <span className="text-2xl">
                    Quiz <span className="text-green-700 font-bold">Builder</span>
                </span>
            </div>
            <button className="p-2 px-4 bg-green-700 rounded-md text-white">
                Save
            </button>
        </div>
    );
}

export default QuizBuildNav;