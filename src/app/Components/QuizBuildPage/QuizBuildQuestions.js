// app/Components/QuizBuildPage/QuizBuildQuestions.js
'use client';

import React, { useEffect, useState, useRef, createRef, forwardRef, useLayoutEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import useGlobalContextProvider from "../../ContextApi";
import toast, { Toaster } from "react-hot-toast";
import Choices from "./Choices"; // Import Choices
import { v4 as uuidv4 } from 'uuid';

function QuizBuildQuestions({ focusProp, quizQuestions, setQuizQuestions }) {
  const prefixes = ['A', 'B', 'C', 'D'];
  const { focus, setFocusFirst } = focusProp;
  const endOfListRef = useRef(null);
  const textAreaRefs = useRef(quizQuestions.map(() => createRef()));
  const [isDefaultChoiceType, setIsDefaultChoiceType] = useState(true); // New state

  function addNewQuestion() {
    setFocusFirst(false);

    const lastIndexQuizQuestions = quizQuestions.length - 1;
    if (quizQuestions[lastIndexQuizQuestions].mainQuestion.trim().length === 0) {
      toast.dismiss();
      toast.error(`The Question ${lastIndexQuizQuestions + 1} is still empty!`);
      textAreaRefs.current[lastIndexQuizQuestions].current.focus();
      return;
    }

    for (const choice of quizQuestions[lastIndexQuizQuestions].choices) {
      if (choice.text.trim().length === 0) {
        toast.dismiss();
        return toast.error(`Please ensure that all previous choices are filled out!`);
      }
    }

    if (quizQuestions[lastIndexQuizQuestions].correctAnswer.length === 0) {
      toast.dismiss();
      return toast.error(`Please ensure to fill out the correct answer!`);
    }

    const newQuestion = { 
      id: uuidv4(), 
      mainQuestion: '',
      choices: [], // Empty choices initially
      correctAnswer: '',
      isImageOptions: false, // Added flag to check if options are images or text
      answeredResult: -1,
      statistics: {
        totalAttempts: 0,
        correctAttempts: 0,
        incorrectAttempts: 0,
      },
    };
     
    setQuizQuestions([...quizQuestions, newQuestion]);
    textAreaRefs.current = [...textAreaRefs.current, createRef()];
  }

  function deleteQuestion(singleQuestion) {
    const quizQuestionsCopy = [...quizQuestions];
    const filterQuestionToDelete = quizQuestionsCopy.filter(
      (question) => singleQuestion.id !== question.id,
    );

    const updatedRefs = textAreaRefs.current.filter((ref, index) => {
      return quizQuestions[index].id !== singleQuestion.id;
    });

    textAreaRefs.current = updatedRefs;
    setQuizQuestions(filterQuestionToDelete);
  }

  function handleInputChange(index, text) {
    const updatedQuestions = quizQuestions.map((question, i) => {
      if (index === i) {
        return { ...question, mainQuestion: text };
      }
      return question;
    });

    setQuizQuestions(updatedQuestions);
  }

  function updateTheChoicesArray(value, choiceIndex, questionIndex, isImage = false) {
    const updatedQuestions = quizQuestions.map((question, i) => {
      if (questionIndex === i) {
        const updatedChoices = question.choices.map((choice, j) => {
          if (choiceIndex === j) {
            return { ...choice, text: value, isImage };
          } else {
            return choice;
          }
        });

        return { ...question, choices: updatedChoices };
      }
      return question;
    });

    setQuizQuestions(updatedQuestions);
  }

  function updateCorrectAnswer(text, questionIndex) {
    const prefixesSubset = prefixes.slice(0, quizQuestions[questionIndex].choices.length);
    const upperText = text.toUpperCase();

    if (!prefixesSubset.includes(upperText)) {
      toast.dismiss();
      return toast.error(`Invalid input. Please enter one of the following: ${prefixesSubset.join(', ')}`);
    }

    const questionsCopy = [...quizQuestions];
    questionsCopy[questionIndex].correctAnswer = upperText;
    setQuizQuestions(questionsCopy);
  }

  function handleSaveQuiz() {
    for (const question of quizQuestions) {
      if (question.choices.length === 0 || question.choices[0].text === '') {
        toast.dismiss();
        return toast.error('Please select a choice type for all questions.');
      }
      if (question.choices[0].isImage === undefined) {
        toast.dismiss();
        return toast.error('Please select a choice type for all questions.');
      }
    }
    // Save quiz logic here
  }

  useLayoutEffect(() => {
    if (endOfListRef.current) {
      setTimeout(() => {
        endOfListRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [quizQuestions.length]);

  useEffect(() => {
    const lastTextAreaIndex = quizQuestions.length - 1;
    if (lastTextAreaIndex >= 0) {
      const lastTextArea = textAreaRefs.current[lastTextAreaIndex].current;
      if (lastTextArea && focus) {
        lastTextArea.focus();
      }
    }
  }, [quizQuestions.length]);

  return (
    <div className="p-3 mt-6 flex justify-between border border-green-700 rounded-md mr-10 ml-10">
      <Toaster
        toastOptions={{
          style: {
            fontSize: '13px',
          },
        }} 
      />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-2 items-center">
          <div className="bg-green-700 px-4 py-2 rounded-md text-white mr-10 ml-10">2</div>
          <span className="font-bold">Quiz Questions:</span>
        </div>
        {quizQuestions.map((singleQuestion, questionIndex) => (
          <div
            ref={quizQuestions.length - 1 === questionIndex ? endOfListRef : null}
            key={questionIndex}
            className="border ml-5 p-4 mt-4 border-green-700 border-opacity-50 rounded-md flex flex-col relative"
          >
            <SingleQuestion
              questionIndex={questionIndex}
              value={singleQuestion.mainQuestion}
              ref={textAreaRefs.current[questionIndex]}
              onChange={(e) => {
                handleInputChange(questionIndex, e.target.value);
              }}
            />
            <Choices
              questionIndex={questionIndex}
              singleQuestion={singleQuestion}
              quizQuestions={quizQuestions}
              setQuizQuestions={setQuizQuestions}
              onChangeChoice={(text, choiceIndex, questionIndex, isImage) => {
                updateTheChoicesArray(text, choiceIndex, questionIndex, isImage);
              }}
              prefixes={prefixes}
              setIsDefaultChoiceType={setIsDefaultChoiceType} // Pass the setter for isDefaultChoiceType
            />
            {questionIndex !== 0 && (
              <FontAwesomeIcon
                icon={faXmark}
                width={10}
                height={10}
                className="text-red-600 absolute top-2 right-3 cursor-pointer"
                onClick={() => {
                  deleteQuestion(singleQuestion);
                }}
              />
            )}

            <CorrectAnswer
              onChangeCorrectAnswer={(text) => {
                updateCorrectAnswer(text, questionIndex);
              }}
              singleQuestion={singleQuestion}
              prefixes={prefixes}
              isDefaultChoiceType={isDefaultChoiceType} // Pass the isDefaultChoiceType state
            />
          </div>
        ))}

        <div className="w-full flex justify-center mt-3">
          <button
            onClick={addNewQuestion}
            className="p-3 bg-green-700 rounded-md text-white w-[210px] text-[13px]"
          >
            Add a New Question
          </button>
          {/* <button
            onClick={handleSaveQuiz}
            className="ml-2 p-3 bg-blue-700 rounded-md text-white w-[210px] text-[13px]"
          >
            Save Quiz
          </button> */}
        </div>
      </div>
    </div>
  );
}

function CorrectAnswer({ onChangeCorrectAnswer, singleQuestion, prefixes, isDefaultChoiceType }) {
  const [correctAnswerInput, setCorrectAnswerInput] = useState(
    singleQuestion.correctAnswer,
  );

  function handleOnChangeInput(e) {
    if (isDefaultChoiceType) {
      e.preventDefault(); // Prevent input
      toast.dismiss();
      return toast.error('Select choice type first');
    }

    const text = e.target.value;
    const upperText = text.toUpperCase(); // Ensure input is uppercase
    const availableChoices = prefixes.slice(0, singleQuestion.choices.length);

    // Check if input is empty or matches one of the available choices
    if (upperText === '' || availableChoices.includes(upperText)) {
      setCorrectAnswerInput(upperText);
      onChangeCorrectAnswer(upperText);
    } else {
      toast.dismiss();
      toast.error(`Invalid input. Please enter one of the following: ${availableChoices.join(', ')}`); // Show error if input is invalid
    }
  }

  return (
    <div className="flex gap-1 items-center mt-3">
      <div className="text-[15px]">Correct Answer</div>
      <div className="border border-gray-200 rounded-md p-1 w-full">
        <input
          value={correctAnswerInput}
          maxLength={1}
          onChange={(e) => {
            handleOnChangeInput(e);
          }}
          className="p-3 outline-none w-full text-[13px]"
          placeholder="Add the correct answer..."
          disabled={isDefaultChoiceType} // Disable input if choiceType is default
        />
      </div>
    </div>
  );
}

const SingleQuestion = forwardRef(function SingleQuestion(
  { questionIndex, value, onChange },
  ref
) {
  return (
    <div className="w-full mt-3">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 text-[15px] border-gray-200">
          <span>Question</span>
          <span>{questionIndex + 1}</span>
        </div>
        <textarea
          className="border border-gray-200 rounded-md p-3 w-full h-[50px] resize-none text-[13px] outline-none"
          placeholder="Your Question Here..... "
          value={value}
          onChange={onChange}
          ref={ref}
        />
      </div>
    </div>
  );
});

export default QuizBuildQuestions;

