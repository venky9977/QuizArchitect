'use client';

import { faXmark, prefix } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState, useRef, createRef, forwardRef, useLayoutEffect } from "react";
import useGlobalContextProvider from "@/app/ContextApi";
import toast, { Toaster } from "react-hot-toast";
import Choices from "./Choices";  // Import Choices

function QuizBuildQuestions({ focusProp }) {
    const prefixes = ['A', 'B', 'C', 'D'];
    const [quizQuestions, setQuizQuestions] = useState([
        { 
            id: uuidv4(), 
            mainQuestion: '', 
            choices: prefixes.slice(0,2).map((prefix) => prefix + '. '),
        },
    ]);

    const { focus, setFocusFirst } = focusProp;
    const endOfListRef = useRef(null);
    const textAreaRefs = useRef(quizQuestions.map(() => createRef()));

    console.log(quizQuestions);
    
    //Add a new question to the quizQuestions

    function addNewQuestion() {
        setFocusFirst(false);
        //This code below to verify if the question field is empty or not
    
        const lastIndexQuizQuestions = quizQuestions.length - 1;
        if (quizQuestions[lastIndexQuizQuestions].mainQuestion.trim().length === 0) {
            toast.error(`The Question ${lastIndexQuizQuestions + 1} is still empty!`);
            textAreaRefs.current[lastIndexQuizQuestions].current.focus();
            return;
        }

        //This code create a new question object and add it to the quiz questions array
        const newQuestion = { 
            id: uuidv4(), 
            mainQuestion: '',
            choices: prefixes.slice(0,2).map((prefix) => prefix + ' '),
         };
        setQuizQuestions([...quizQuestions, newQuestion]);
        textAreaRefs.current = [...textAreaRefs.current, createRef()];
    }

    function deleteQuestion(singleQuestion) {
        const quizQuestionsCopy = [...quizQuestions];
        const filterQuestionToDelete = quizQuestionsCopy.filter(
            (question) => singleQuestion.id !== question.id,
        );

        // Filter out the corresponding ref
        const updatedRefs = textAreaRefs.current.filter((ref, index) => {
            return quizQuestions[index].id !== singleQuestion.id;
        });

        textAreaRefs.current = updatedRefs;
        setQuizQuestions(filterQuestionToDelete);
    }

    function handleInputChange(index, text) {
        const updatedQuestions = quizQuestions.map((question, i) => {
            if (index === i) {
                return { ...question, mainQuestion: text };
            }
            return question;
        });

        setQuizQuestions(updatedQuestions);
    }

    function updateTheChoicesAray(text, choiceIndex, questionIndex){
        console.log('text', text);
        console.log('choiceIndex', choiceIndex);
        console.log('questionIndex', questionIndex);

        const updatedQuestions = quizQuestions.map((question, i) => {
            if(questionIndex===i){
                const updatedChoices = question.choices.map((choice, j) => {
                    if(choiceIndex === j){
                        return prefixes[j] + '. ' + text;
                    }
                    else {
                        return choice;
                    }
                });

                return {...question, choices: updatedChoices};
            }
            return question;
        });

        setQuizQuestions(updatedQuestions);
    }

    useLayoutEffect(() => {
        if (endOfListRef.current) {
            console.log(endOfListRef);
            setTimeout(() => {
                endOfListRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [quizQuestions.length]);

    useEffect(() => {
        // Focus the last textarea if it exists
        const lastTextAreaIndex = quizQuestions.length - 1;
        if (lastTextAreaIndex >= 0) {
            const lastTextArea = textAreaRefs.current[lastTextAreaIndex].current;
            if (lastTextArea && focus) {
                lastTextArea.focus();
            }
        }
    }, [quizQuestions.length]);

    return (
        <div className="p-3 mt-6 flex justify-between border border-green-700 rounded-md mr-10 ml-10">
            <Toaster
                toastOptions={{
                    style: {
                        fontSize: '13px',
                    },
                }} 
            />
            <div className="flex flex-col gap-2 w-full">
                {/* Header Area */}
                <div className="flex gap-2 items-center">
                    <div className="bg-green-700 px-4 py-2 rounded-md text-white mr-10 ml-10">2</div>
                    <span className="font-bold">Quiz Questions:</span>
                </div>
                {/* Questions Area */}
                {quizQuestions.map((singleQuestion, questionIndex) => (
                    <div
                        ref={quizQuestions.length - 1 === questionIndex ? endOfListRef : null}
                        key={questionIndex}
                        className="border ml-5 p-4 mt-4 border-green-700 border-opacity-50 rounded-md flex flex-col relative"
                    >
                        <SingleQuestion
                            questionIndex={questionIndex}
                            value={singleQuestion.mainQuestion}
                            ref={textAreaRefs.current[questionIndex]}
                            onChange={(e) => {
                                handleInputChange(questionIndex, e.target.value);
                            }}
                        />
                        <Choices
                            questionIndex={questionIndex}
                            singleQuestion={singleQuestion}
                            quizQuestions={quizQuestions}
                            setQuizQuestions={setQuizQuestions}
                            onChangeChoice={(text, choiceIndex, questionIndex) => {
                                updateTheChoicesAray(text, choiceIndex, questionIndex);
                            }}
                            value={singleQuestion.choices}
                            prefixes={prefixes}
                        />
                        {questionIndex !== 0 && (
                            <FontAwesomeIcon
                                icon={faXmark}
                                width={10}
                                height={10}
                                className="text-red-600 absolute top-2 right-3 cursor-pointer"
                                onClick={() => {
                                    deleteQuestion(singleQuestion);
                                }}
                            />
                        )}
                    </div>
                ))}

                {/* Button Area */}
                <div className="w-full flex justify-center mt-3">
                    <button
                        onClick={() => {
                            addNewQuestion();
                        }}
                        className="p-3 bg-green-700 rounded-md text-white w-[210px] text-[13px]"
                    >
                        Add a New Question
                    </button>
                </div>
            </div>
        </div>
    );
}
export default QuizBuildQuestions;

const SingleQuestion = forwardRef(function SingleQuestion(
    { questionIndex, value, onChange },
    ref
) {
    console.log(questionIndex);
    return (
        <div className="w-full mt-3">
            <div className="flex flex-col gap-2">
                <div className="flex gap-2 text-[15px] border-gray-200">
                    <span>Question</span>
                    <span>{questionIndex + 1}</span>
                </div>
                <textarea
                    className="border border-gray-200 rounded-md p-3 w-full h-[50px] resize-none text-[13px] outline-none"
                    placeholder="Your Question Here..... "
                    value={value}
                    onChange={onChange}
                    ref={ref}
                />
            </div>
        </div>
    );
});
