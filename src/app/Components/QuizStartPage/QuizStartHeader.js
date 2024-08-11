// src/app/Components/QuizStartPage/QuizStartHeader.js

'use client';

import React from 'react';
import { faCode, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useGlobalContextProvider from '../../ContextApi';

function QuizStartHeader({ parentTimer }) {
  const { quizToStartObject } = useGlobalContextProvider();
  const { selectQuizToStart } = quizToStartObject;
  const { quizTitle, quizQuestions } = selectQuizToStart;

  const minutes = Math.floor(parentTimer / 60);
  const seconds = parentTimer % 60;

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <div className="bg-blue-700 w-12 h-12 flex items-center justify-center p-2 rounded-md">
          <FontAwesomeIcon
            className="text-white"
            width={25}
            height={25}
            icon={faCode}
          />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-xl">{quizTitle}</h2>
          <span className="font-light text-sm">
            {quizQuestions.length} Questions
          </span>
        </div>
      </div>
      {parentTimer !== null && (
        <div className="flex gap-2 items-center">
          <FontAwesomeIcon
            className="text-blue-700"
            width={20}
            height={20}
            icon={faStopwatch}
          />
          <span>{`00:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</span>
        </div>
      )}
    </div>
  );
}

export default QuizStartHeader;
