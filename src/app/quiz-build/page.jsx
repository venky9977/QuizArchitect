'use client';

import React, { useState } from "react";
import QuizBuildNav from '../Components/QuizBuildPage/QuizBuildNav'
import QuizBuildTitle from '../Components/QuizBuildPage/QuizBuildTitle'
import QuizBuildQuestions from '../Components/QuizBuildPage/QuizBuildQuestions'

function Page(props){
    const [focusFirst, setFocusFirst] = useState(true);

    const quizTitleProps = {
        focusProp: {focus: focusFirst, setFocusFirst},
    };

    const quizQuestionsProps = {
        focusProp: {focus: !focusFirst, setFocusFirst},
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