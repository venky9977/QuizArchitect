// src/app/quiz-build/page.jsx
'use client';

import React, { useEffect, useState } from "react";
import QuizBuildNav from '../Components/QuizBuildPage/QuizBuildNav';
import QuizBuildTitle from '../Components/QuizBuildPage/QuizBuildTitle';
import QuizBuildQuestions from '../Components/QuizBuildPage/QuizBuildQuestions';
import { v4 as uuidv4 } from 'uuid';
import IconsComponents from '../Components/QuizBuildPage/IconsComponents';
import useGlobalContextProvider from "../ContextApi";
import { Toaster } from "react-hot-toast";

function Page(props) {
    const prefixes = ['A', 'B', 'C', 'D'];
    const { selectedIconObject, selectedQuizObject } = useGlobalContextProvider();
    const { selectedIcon } = selectedIconObject;
    const { selectedQuiz } = selectedQuizObject;
    const [focusFirst, setFocusFirst] = useState(true);

    const [quizQuestions, setQuizQuestions] = useState(() => {
        if (selectedQuiz) {
            return selectedQuiz.quizQuestions;
        } else {
            return [
                {
                    id: uuidv4(),
                    mainQuestion: '',
                    choices: prefixes.slice(0, 2).map((prefix) => ({ text: `${prefix}. `, isImage: false })),
                    correctAnswer: '',
                    answeredResult: -1,
                    statistics: {
                        totalAttempts: 0,
                        correctAttempts: 0,
                        incorrectAttempts: 0,
                    },
                },
            ];
        }
    });

    const [newQuiz, setNewQuiz] = useState(() => {
        if (selectedQuiz) {
            return selectedQuiz;
        } else {
            return {
                id: uuidv4(),
                icon: selectedIcon.faIcon,
                quizTitle: '',
                quizQuestions: quizQuestions,
            };
        }
    });

    useEffect(() => {
        setNewQuiz((prevQuiz) => ({
            ...prevQuiz,
            icon: selectedIcon.faIcon,
            quizQuestions: quizQuestions,
        }));
    }, [quizQuestions, selectedIcon.faIcon]);

    function onChangeQuizTitle(text) {
        setNewQuiz((prevQuiz) => ({ ...prevQuiz, quizTitle: text }));
    }

    const quizNavBarProps = {
        quizQuestions,
        newQuiz,
        setNewQuiz,
    };

    const quizTitleProps = {
        focusProp: { focus: focusFirst, setFocusFirst },
        onChangeQuizTitle,
    };

    const quizQuestionsProps = {
        focusProp: { focus: !focusFirst, setFocusFirst },
        quizQuestions,
        setQuizQuestions,
    };

    return (
        <div className="relative max-16 poppins">
            <IconsComponents />
            <Toaster />
            <QuizBuildNav {...quizNavBarProps} />
            <QuizBuildTitle {...quizTitleProps} />
            <QuizBuildQuestions {...quizQuestionsProps} />
        </div>
    );
}

export default Page;
