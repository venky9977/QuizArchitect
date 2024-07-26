'use client';

import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from "next/image";
import { faEllipsis, faPlay, faQuestion, faCode } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import useGlobalContextProvider from "../ContextApi";
import convertToFaIcons from "../convertToFaIcons";

function successRate(singleQuiz) {
  let correctQuestions = 0;
  let totalAttempts = 0;
  let successRate = 0;

  singleQuiz.quizQuestions.forEach((question) => {
    totalAttempts += question.statistics.totalAttempts;
    correctQuestions += question.statistics.correctAttempts;
  });

  successRate = Math.ceil((correctQuestions / totalAttempts) * 100);
  return successRate;
}

function QuizCard({ singleQuiz }) {
  const { 
    quizToStartObject, 
    dropDownToggleObject, 
    threeDotsPositionsObject, 
    selectedQuizObject, 
  } = useGlobalContextProvider();
  const { setDropDownToggle } = dropDownToggleObject;
  const { setSelectQuizToStart } = quizToStartObject;
  const { setThreeDotsPositions } = threeDotsPositionsObject;
  const { setSelectedQuiz } = selectedQuizObject;

  const { quizTitle, quizQuestions, icon } = singleQuiz;
  const totalQuestions = quizQuestions.length;
  const globalSuccessRate = successRate(singleQuiz);

  function openDropDownMenu(event) {
    const xPos = event.clientX;
    const yPos = event.clientY;

    setThreeDotsPositions({ x: xPos, y: yPos });

    if (event) {
      event.stopPropagation();
    }

    setDropDownToggle(true);
    setSelectedQuiz(singleQuiz);
  }

  return (
    <div className="rounded-[10px] flex flex-col gap-2 border border-gray-300 bg-white p-4">
      {/* Image container */}
      <div className="relative bg-blue-700 w-full h-32 flex justify-center items-center rounded-md">
        {/* More Options Icon */}
        <div className="absolute cursor-pointer top-3 right-3">
          <FontAwesomeIcon 
            className="text-white"
            height={13}
            width={13}
            icon={faEllipsis}
            onClick={openDropDownMenu}
          />
        </div>
        {/* Quiz icon */}
        <FontAwesomeIcon 
          className="text-white text-3xl"
          height={120}
          width={120}
          icon={convertToFaIcons(icon)}
        />
      </div>
      {/* Title Area */}
      <h3 className="font-bold">{quizTitle}</h3>
      {/* Questions */}
      <p className="text-sm font-light">{totalQuestions} question(s)</p>
      {/* Footer Area */}
      <div className="flex gap-3">
        {/* Success rate area */}
        <div className="flex gap-1 items-center">
          <Image src="/target-icon.png" width={20} height={10} alt="Target Icon" />
          <span className="text-[12px]">
            Success rate: {globalSuccessRate}%
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
    </div>
  );
}

export default QuizCard;
