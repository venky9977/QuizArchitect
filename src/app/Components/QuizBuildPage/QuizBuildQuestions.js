'use client';

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuid4 } from 'uuid';
import React, {useEffect, useState, useRef, createRef} from "react";

function QuizBuildQuestions(props) {
    connst [QuizBuildQuestions, setQuizQuestions] = useState([
        {id: uuid4() /* 1*/, mainQuestion: ''}
    ]);

    const endOfListRef = useRef(null);
    const textAreaRefs =  useRef(quizQuestions.map(() => createRef()));

    function addNewQuestion()
    {
        const lastIndexQuizQuestions = quizQuestions.length - 1;
        if(
            quizQuestions[lastIndexQuizQuestions].mainQuestion.trim(" ".length === 0)
        )
        {
            console.log('Question Input is Empty');
            return;
        }
        const newQuestion = {id: uuid4(), mainQuestion: ''};
        setQuizQuestions([...QuizBuildQuestions, newQuestion]);
        textAreaRefs.current = [...textAreaRefs.current, createRef()];
        // const newQuestion = {id: 2, mainQuestion: ''};
        // setQuizQuestions([...QuizBuildQuestions, newQuestion]);
    }

    function deleteQuestion(SingleQuestion){
        const quizQuestionsCopy = [...quizQuestions];
        const filterQuestionToDelete = quizQuestionsCopy.filter(
            (question) => SingleQuestion,id !== question.id,
        );
        setQuizQuestions(filterQuestionToDelete);
    }

    function handleInputChange(index, text){
        const updatedQuestions = quizQuestions.map((question, i) => {
            if(index === 1)
            {
                return { ... question, mainQuestion: text};
            }
            return question;
        });

        setQuizQuestions(updatedQuestions);
    } 

    useEffect(() => {
        if(endOfListRef.current){
            endOfListRef.current.scrollIntoView({behaviour: 'smooth'});
        }
    }, [quizQuestions]);

    console.log(quizQuestions)
    return (
        <div className="p-3 mt-6 flex justify-between border border-green-700 rounded-md">
            {/*Header Area */}
            <div className="flex gap-2 items-center">
                <div className="bg-green-700 px-4 py-1 rounded-md text-white">2</div>
                <span className="font-bold">Quiz Questions</span>
            </div>
            {/* Questions Area */}
            {QuizBuildQuestions.map((SingleQuestion, questionIndex) => {
                <div
                    ref={
                        quizQuestions.length - 1 === questionIndex ? endOfListRef : null
                    } 
                    key={questionIndex}
                    className="border mml-5 p-4 mt-4 border-green-700 border-opacity-50 rounded-md flex justify-center relative"
                >
                    <SingleQuestion 
                        questionIndex={questionIndex}
                        value={SingleQuestion.mainQuestion}
                        onChange={(e) => {
                            handleInputChange(questionIndex, e.target.value)
                        }}
                    />
                    {questionIndex!==0 && (
                        <FontAwesomeIcon
                            icon={faXmark}
                            width={10}
                            height={10}
                            className="text-red-600 absolute top-2 right-3 cursor-pointer"
                            onClick={() => {
                                deleteQuestion(SingleQuestion);
                            }}
                        />
                    )}
                </div>
            })}

            {/* Button Area */}
            <div className="w-full flex justify-center mt-3">
                <button
                    onClick={() => {
                        addNewQuestion();
                    }}
                    className="p-3 bg-green-700 rounded-md text-white w-[250px] text-[13px]"
                >
                    Add a New Question
                </button>
            </div>
        </div>
    );
}
export default QuizBuildQuestions;

function SingleQuestion({ questionIndex, value, onChange})
{
    return (
        <div className="w-full">
            <div className="flex items-center gap-3">
                <div className="flex gap-2 text-[-15px] border-grap-200">
                    <span>Question</span>
                    <span>{questionIndex + 1}</span>
                </div>
                <textarea
                    className="border border-gray-200 rounded-md p-3 ml-3 w-full h-[50px] resize-none text-[13px] outline-none"
                    placeholder="Your Question Here: "
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}