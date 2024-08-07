// app/Components/QuizList.js
'use client';

import React from 'react';
import QuizCard from './QuizCard';
import useGlobalContextProvider from '../ContextApi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function QuizList() {
  const { allQuizzes, loginState } = useGlobalContextProvider();
  const { isLoggedIn } = loginState;
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">My Quizzes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {allQuizzes.map((quiz, index) => (
          <QuizCard key={index} singleQuiz={quiz} />
        ))}
        {isLoggedIn && (
          <div
            onClick={() => router.push('/quiz-build')}
            className="rounded-md flex flex-col items-center justify-center border border-gray-300 bg-white p-4 cursor-pointer hover:shadow-lg"
          >
            <Image
              src={'/add-quiz.png'}
              width={160}
              height={160}
              alt="Add a New Quiz"
            />
            <span className="text-gray-500 mt-2">Add a New Quiz</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizList;
