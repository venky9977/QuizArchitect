'use client';

import React from "react";
import QuizCard from './QuizCard';
import PlaceHolder from "./PlaceHolder";
import useGlobalContextProvider from "../ContextApi";
import Image from "next/image";
import { useRouter } from "next/navigation";

function QuizzesArea({ props }) {
  const { allQuizzes, userObject } = useGlobalContextProvider(); // Ensure userObject is destructured here
  const { user } = userObject; // Destructure user from userObject
  const router = useRouter();

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
                  <div className="flex gap-2 flex-wrap">
                    {allQuizzes.map((singleQuiz, quizIndex) => (
                      <div key={quizIndex}>
                        <QuizCard singleQuiz={singleQuiz} />
                      </div>
                    ))}
                  </div>
                  <div
                    onClick={() => router.push('/quiz-build')}
                    className="cursor-pointer justify-center items-center rounded-[-10px] w-[230px] flex flex-col gap-2 border border-gray-100 bg-white p-4"
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
