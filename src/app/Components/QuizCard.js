// src/app/Components/QuizCard.js
'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { faEllipsis, faPlay } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import useGlobalContextProvider from '../ContextApi';
import convertToFaIcons from '../convertToFaIcons';
import DropDown from './DropDown';

function successRate(singleQuiz) {
  let correctQuestions = 0;
  let totalAttempts = 0;

  singleQuiz.quizQuestions.forEach((question) => {
    totalAttempts += question.statistics.totalAttempts;
    correctQuestions += question.statistics.correctAttempts;
  });

  return totalAttempts > 0 ? Math.ceil((correctQuestions / totalAttempts) * 100) : 0;
}

function QuizCard({ singleQuiz }) {
  const { quizToStartObject, selectedQuizObject, loginState } = useGlobalContextProvider();
  const { setSelectQuizToStart } = quizToStartObject;
  const { setSelectedQuiz } = selectedQuizObject;
  const { isLoggedIn } = loginState;

  const { quizTitle, quizQuestions, icon } = singleQuiz;
  const totalQuestions = quizQuestions.length;
  const globalSuccessRate = successRate(singleQuiz);

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  function openDropDownMenu(event) {
    event.stopPropagation();
    setSelectedQuiz(singleQuiz);
    setIsDropDownOpen(true);
  }

  return (
    <div className="relative rounded-md flex flex-col gap-2 border border-gray-300 bg-white p-4 w-full hover:shadow-lg">
      <div className="relative bg-blue-700 w-full h-32 flex justify-center items-center rounded-md">
        {isLoggedIn && (
          <div className="absolute cursor-pointer top-3 right-3" onClick={openDropDownMenu}>
            <FontAwesomeIcon
              className="text-white"
              height={13}
              width={13}
              icon={faEllipsis}
            />
          </div>
        )}
        <FontAwesomeIcon
          className="text-white text-3xl"
          height={120}
          width={120}
          icon={convertToFaIcons(icon)}
        />
      </div>
      <h3 className="font-bold">{quizTitle}</h3>
      <p className="text-sm font-light">{totalQuestions} question(s)</p>
      <div className="flex gap-3">
        <div className="flex gap-1 items-center">
          {/* <Image src="/target-icon.png" width={20} height={10} alt="Target Icon" /> */}
          <span className="text-[12px]">
            Click on Play to Start the Quiz
          </span>
        </div>
        <Link href="/quiz-start">
          <div
            onClick={() => setSelectQuizToStart(singleQuiz)}
            className="rounded-full w-7 h-7 bg-blue-700 flex items-center justify-center cursor-pointer"
          >
            <FontAwesomeIcon
              className="text-white"
              height={15}
              width={15}
              icon={faPlay}
            />
          </div>
        </Link>
      </div>
      {isLoggedIn && (
        <DropDown
          isOpen={isDropDownOpen}
          onClose={() => setIsDropDownOpen(false)}
        />
      )}
    </div>
  );
}

export default QuizCard;
