'use client';

import React from "react";
import QuizCard from './QuizCard';
import PlaceHolder from "./PlaceHolder";
import useGlobalContextProvider from "../ContextApi";

function QuizzesArea({props}){
    const {allQuizzes} = useGlobalContextProvider();

    const { user, setUser } = userObject;

    return (
        <div className="poppins mx-12 mt-10">
          <div>
            {user.isLogged && (
                <>
                    {allQuizzes.length === 0 ? (
                    <PlaceHolder />
                    ) : (
                    <div>
                        <h2 className="text-xl font-bold">My Quizzes</h2>
                        <div className="mt-6 flex gap-2 flex-wrap">
                        {allQuizzes.map((singleQuiz, quizIndex) => (
                            <div key={quizIndex}>
                            <QuizCard singleQuiz={singleQuiz} />
                            </div>
                        ))}
                        </div>
                    </div>
                    )}
                </>
            )}
          </div>
        </div>
      );
      
    }
            

export default QuizzesArea;