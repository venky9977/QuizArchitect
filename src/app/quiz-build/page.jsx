'use client';

<<<<<<< Updated upstream
import React, { useState } from "react";
import QuizBuildNav from '../Components/QuizBuildPage/QuizBuildNav'
import QuizBuildTitle from '../Components/QuizBuildPage/QuizBuildTitle'
import QuizBuildQuestions from '../Components/QuizBuildPage/QuizBuildQuestions'

function Page(props){
    const [focusFirst, setFocusFirst] = useState(true);

=======
import React, { useEffect, useState } from "react";
import QuizBuildNav from '../Components/QuizBuildPage/QuizBuildNav';
import QuizBuildTitle from '../Components/QuizBuildPage/QuizBuildTitle';
import QuizBuildQuestions from '../Components/QuizBuildPage/QuizBuildQuestions';
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faCode, prefix } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from 'uuid';
import IconsComponents from "../Components/QuizBuildPage/IconsComponents";
import useGlobalContextProvider from "../ContextApi";

function Page(props){
    const prefixes = ['A', 'B', 'C', 'D'];
    const {selectedIconObject} = useGlobalContextProvider();
    const {selectedIcon} = selectedIconObject;
    const [focusFirst, setFocusFirst] = useState(true);
    const [quizQuestions, setQuizQuestions] = useState([
        {
            id: uuidv4(),
            mainQuestion: '',
            choices: prefixes.slice(0,2). map((prefix) => prefix + '. '),
            correctAnswer: '',
            answeredResult: -1,
            statistics: {
                totalAttempts: 0,
                correctAttempts: 0,
                incorrectAttempts: 0,
            },
        },
    ]);

    console.log(selectedIcon.faIcon);
    
    const [newQuiz, setNewQuiz] = useState({
        id: uuidv4(),
        icon: selectedIcon.faIcon, 
        quizTitle: '',
        quizQuestions: quizQuestions,
    });

    useEffect(() => {
        setNewQuiz((prevQuiz) => ({
            ...prevQuiz,
            icon: selectedIcon.faIcon,
            quizQuestions: quizQuestions,
        }));
    }, [quizQuestions, selectedIcon.faIcon]);

    console.log(newQuiz);

    // const [focusFirst, setFocusFirst] = useState(true);

    function onChangeQuizTitle(text){
        setNewQuiz((prevQuiz) => ({ ...prevQuiz, quizTitle: text }));
    }
    
    const quizNavBarProps = {
        quizQuestions,
        newQuiz,
    };

>>>>>>> Stashed changes
    const quizTitleProps = {
        focusProp: {focus: focusFirst, setFocusFirst},
    };

    const quizQuestionsProps = {
        focusProp: {focus: !focusFirst, setFocusFirst},
<<<<<<< Updated upstream
=======
        quizQuestions,
        setQuizQuestions,
>>>>>>> Stashed changes
    };


    return (
        <div className="relative max-16 poppins">
            <IconsComponents />
            
            <QuizBuildNav {...quizNavBarProps} />
            <QuizBuildTitle {...quizTitleProps} />
            <QuizBuildQuestions {...quizQuestionsProps} />    
        </div>
    );
}

export default Page;