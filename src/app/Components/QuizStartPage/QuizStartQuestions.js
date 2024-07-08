'use client';

import React, {useEffect, useState} from 'react';
import useGlobalContextProvider from '@/app/ContextApi';

function QuizStartQuestions(props){
    const {quizToStartObject,allQuizzes, setAllQuizzes} = useGlobalContextProvider();
    const {selectQuizToStart} = quizToStartObject;
    const {quizQuestions} = selectQuizToStart;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [indexOfQuizSelected, setIndexOfQuizSelected] = useState(null);
    const [isQuizEnded, setIsQuizEnded] = useState(false);

    //with the useEffect every time the component is loaded up
    //we need to get the index of the quiz we selected inside
    //the allquizzes array to update it when we choose the answer

    useEffect(() => {
        const quizIndexFound = allQuizzes.findIndex(
            (quiz) => quiz.id === selectQuizToStart.id,
        );
        setIndexOfQuizSelected(quizIndexFound);
    }, []);

    console.log(allQuizzes);

    useEffect(() => {
        if(isQuizEnded) {
            //reinitialize all answers to -1
            quizQuestions.forEach((quizQuestion) => {
                quizQuestion.answeredResult = -1;
            });

            //print out the message
            console.log('quiz has ended.....');
        }
    }, [isQuizEnded]);

    function selectChoiceFunction(choiceIndexClicked){
        //update the selectedChoice variable state
        setSelectedChoice(choiceIndexClicked);

        //we update the answerResult property in the allQuizzes array
    }

    function moveToTheNextQuestion() {
        //To avoid going out of the index bound
        if(currentQuestionIndex === quizQuestions.length - 1) {
            return;
        }

        //increment the currentQuestionIndex by 1 to go to the next question
        setCurrentQuestionIndex((current) => current + 1);
    }

    return(
        <div className="poppins rounded-sm m-9 w-9/12">
            {/* The Questions Part */}
            <div className="flex justify-center items-center gap-2">
                <div className="bg-green-700 flex justify-center items-center rounded-md w-11 h-11 text-white p-3">
                    {currentQuestionIndex + 1}
                </div>
                <p>
                    {quizQuestions[currentQuestionIndex].mainQuestion}
                </p>
            </div>
            {/* The answers part  */}
            <div className="mt-7 flex flex-col gap-2">
                {quizQuestions[currentQuestionIndex].choices.map(
                    (choice, indexChoice) => (
                        <div 
                            key={indexChoice}
                            className='p-3 ml-11 w-10/12 border border-green-700 rounded-md hover:bg-green-700 hover:text-white transition-all select-none'
                        >
                            {choice}
                        </div>
                    ),
                )}
            </div>

            {/* Submit Button  */}
            <div className="flex justify-end mt-7">
                <button 
                    onClick={() => {
                        moveToTheNextQuestion();
                    }}
                    className="p-2 px-5 text-[15px] text-white rounded-md bg-green-700 mr-[100px]">
                    SUBMIT
                </button>
            </div>
        </div>
    )

}

export default QuizStartQuestions;
