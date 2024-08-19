// app/Components/QuizzesArea.js
'use client';

import React from "react";
import QuizCard from './QuizCard';
import PlaceHolder from "./PlaceHolder";
import useGlobalContextProvider from "../ContextApi";
import Image from "next/image";
import { useRouter } from "next/navigation";

function QuizzesArea() {
  const { allQuizzes, loginState, dropDownToggleObject, selectedQuizObject } = useGlobalContextProvider();
  const { isLoggedIn } = loginState;
  const { dropDownToggle } = dropDownToggleObject;
  const { setSelectedQuiz } = selectedQuizObject; // Access setSelectedQuiz from the context
  const router = useRouter();

  const handleAddNewQuizClick = () => {
    setSelectedQuiz(null); // Clear the selected quiz state to ensure a fresh start
    router.push('/quiz-build'); // Navigate to the quiz builder page
  };

  return (
    <div className="poppins mx-12 mt-10 flex-grow bg-white text-black">
      <div>
        {allQuizzes.length === 0 ? (
          <PlaceHolder />
        ) : (
          <div>
            <h2 className="text-xl font-bold">My Quizzes</h2>
            <div className="mt-6 flex gap-2 flex-wrap">
              <div className="flex gap-2 flex-wrap">
                {allQuizzes.map((singleQuiz, quizIndex) => (
                  <div key={quizIndex}>
                    <QuizCard singleQuiz={singleQuiz} />
                  </div>
                ))}
              </div>
              {isLoggedIn && (
                <div
                  onClick={handleAddNewQuizClick}
                  className="cursor-pointer justify-center items-center rounded-md w-[230px] flex flex-col gap-2 border border-gray-100 bg-white p-4"
                >
                  <Image
                    src={'/add-quiz.png'}
                    width={160}
                    height={160}
                    alt="Add a New Quiz"
                  />
                  <span className="select-none opacity-40">
                    Add a New Quiz
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizzesArea;
