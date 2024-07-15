'use client';

import React, {useEffect, useRef, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";

function QuizBuildTitle({focusProp, onChangeQuizTitle}) {
    const [quizTitle, setQuizTitle] = useState('');
    const {focus, setFocusFirst} = focusProp;
    const quizTitleRef = useRef(null);
    
    function handleTextInputChange(text){
        setQuizTitle(text);
        onChangeQuizTitle(text);
    }

    useEffect(() => {
        if(focus){
            quizTitleRef.current.focus();
        }
    }, []);

    return (
        <div className="p-3 flex justify-between border border-green-700 rounded-md mr-10 ml-10">
            <div className="flex gap-2">
                <div className="flex gp-2 items-center">
                    <div className="bg-green-700 px-4 py-2 rounded-md text-white mr-10 ml-10">1</div>
                    <span className="font-bold">Quiz Name: </span>
                </div>
                <input
                    onChange={(e) => {
                        handleTextInputChange(e.target.value);
                    }}
                    value={quizTitle}
                    ref={quizTitleRef}
                    className="outline-none border-b-2 pt-1 w-[300px] text-[13px]"
                    placeholder="Enter the Name of the Quiz...."
                />
            </div>
            <FontAwesomeIcon
                icon={faCode}
                height={40}
                width={40}
                className="text-white p-2 rounded-md bg-green-700 cursor-pointer"
            />
        </div>
    );
}

export default QuizBuildTitle;