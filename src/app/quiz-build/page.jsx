'use client';

import React, { useEffect, useState } from "react";
import QuizBuildNav from '../Components/QuizBuildPage/QuizBuildNav'
import QuizBuildTitle from '../Components/QuizBuildPage/QuizBuildTitle'
import QuizBuildQuestions from '../Components/QuizBuildPage/QuizBuildQuestions'
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from 'uuid';
import useGlobalContextProvider from "../ContextApi";

function Page(props){
    const prefixes = ['A', 'B', 'C', 'D'];
    //const { selectedIconObject, selectedIconObject } = useGlobalContextProvider();
    const { selectedIcon } = selectedIconObject;
    const { selectedQuiz } = selectedQuizObject;
    const { focusFirst, setFocusFirst } = useState(true);

    const [newQuiz, setNewQuiz] = useState({
        id: uuidv4(),
        icon: faCode, 
        quizTitle: '',
        quizQuestions: quizQuestions,
    });

    useEffect(() => {
        setNewQuiz((prevQuiz) => ({
            ...prevQuiz,
            quizQuestions: quizQuestions,
        }))
    }, {quizQuestions});

    //const [focusFirst, setFocusFirst] = useState(true);

    function onChangeQuizTitle(text){
        setNewQuiz((prevQuiz) => ({ ...prevQuiz, quizTitle, text }));
    }
    
    const quizNavBarProps = {
        quizQuestions,
        newQuiz,
    }

    const quizTitleProps = {
        focusProp: {focus: focusFirst, setFocusFirst},
        onChangeQuizTitle,
    };

    const quizQuestionsProps = {
        focusProp: {focus: !focusFirst, setFocusFirst},
        quizQuestionsProps,
        setQuizQuestions,
    };


    return (
        <div className="max-16 poppins">
            <QuizBuildNav />
            <QuizBuildTitle {...quizTitleProps} />
            <QuizBuildQuestions {...quizQuestionsProps} />    
        </div>
    );
}

export default Page;