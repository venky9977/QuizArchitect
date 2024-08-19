'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import useGlobalContextProvider from '../../ContextApi';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function QuizStartQuestions({ onQuizEnd, onUpdateTime, quiz }) {
  const initialTime = 120; // 10 seconds
  const { allQuizzes, setAllQuizzes, userObject } = useGlobalContextProvider();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [indexOfQuizSelected, setIndexOfQuizSelected] = useState(null);
  const [isQuizEnded, setIsQuizEnded] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [incorrectAnswersCount, setIncorrectAnswersCount] = useState(0);
  const { user } = userObject;
  const [timer, setTimer] = useState(initialTime);
  const intervalRef = useRef(null);
  const hasSavedToGoogleSheets = useRef(false);
  const router = useRouter();

  const moveToTheNextQuestion = useCallback(() => {
    clearInterval(intervalRef.current);
    if (currentQuestionIndex < quiz.quizQuestions.length - 1) {
      setCurrentQuestionIndex((current) => current + 1);
      setSelectedChoice(null);
      setTimer(initialTime);
    } else {
      setIsQuizEnded(true);
    }
  }, [currentQuestionIndex, quiz.quizQuestions.length, initialTime]);

  const handleIncorrectAnswer = useCallback(() => {
    if (indexOfQuizSelected === null || indexOfQuizSelected === undefined || isQuizEnded) {
      return;
    }

    const currentAllQuizzes = [...allQuizzes];
    const currentQuestion = currentAllQuizzes[indexOfQuizSelected]?.quizQuestions[currentQuestionIndex];
    if (currentQuestion) {
      setIncorrectAnswersCount((current) => current + 1);
      setAllQuizzes(currentAllQuizzes);
      toast.error('Incorrect Answer');
      moveToTheNextQuestion();
    } else {
      toast.error('Question data is missing.');
    }
  }, [indexOfQuizSelected, currentQuestionIndex, allQuizzes, setAllQuizzes, moveToTheNextQuestion, isQuizEnded]);

  const startTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimer((prevTime) => {
        const newTime = prevTime - 1;
        onUpdateTime(newTime);
        if (newTime <= 0) {
          clearInterval(intervalRef.current);
          if (!isQuizEnded) {
            handleIncorrectAnswer(); // Move to the next question or end the quiz
          }
          return 0;
        }
        return newTime;
      });
    }, 1000);
  }, [handleIncorrectAnswer, onUpdateTime, isQuizEnded]);

  useEffect(() => {
    if (quiz && quiz._id && allQuizzes.length > 0) {
      const quizIndexFound = allQuizzes.findIndex((q) => q._id === quiz._id);
      if (quizIndexFound === -1) {
        toast.error('Quiz not found in allQuizzes');
        return;
      }
      setIndexOfQuizSelected(quizIndexFound);
      setTimer(initialTime);
    } else {
      toast.error('Quizzes not loaded properly.');
    }
    return () => clearInterval(intervalRef.current);
  }, [allQuizzes, quiz, initialTime]);

  useEffect(() => {
    if (timer > 0 && !isQuizEnded) {
      startTimer();
    }
    return () => clearInterval(intervalRef.current);
  }, [timer, isQuizEnded, startTimer]);

  const saveDataIntoDB = useCallback(() => {
    if (hasSavedToGoogleSheets.current) return;
    hasSavedToGoogleSheets.current = true;

    const data = {
      name: user.name,
      score: score,
      quizTitle: quiz.quizTitle,
      date: new Date().toLocaleDateString(),
    };

    fetch('/api/proxy/macros/s/AKfycby-httiDPNhTHk8pG0mfDyIM4UNxF0RONlTVQvSqo63jf4aov99ZvLbzTJNAPoCwDwb/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((result) => {
        console.log('Data saved to Google Sheets:', result);
      })
      .catch((error) => {
        console.error('Error saving data to Google Sheets:', error);
      });
  }, [user.name, score, quiz.quizTitle]);

  useEffect(() => {
    if (isQuizEnded) {
      saveDataIntoDB();
      if (onQuizEnd) onQuizEnd();
    }
  }, [isQuizEnded, onQuizEnd, saveDataIntoDB]);

  const selectChoiceFunction = (choiceIndexClicked) => {
    if (indexOfQuizSelected === null || indexOfQuizSelected === undefined) {
      toast.error('Quiz not selected properly.');
      return;
    }
    setSelectedChoice(choiceIndexClicked);
    const currentAllQuizzes = [...allQuizzes];
    const currentQuestion = currentAllQuizzes[indexOfQuizSelected]?.quizQuestions[currentQuestionIndex];
    if (currentQuestion) {
      currentQuestion.answeredResult = choiceIndexClicked;
      setAllQuizzes(currentAllQuizzes);
    } else {
      toast.error('Question data is missing.');
    }
  };

  const handleCorrectAnswer = useCallback(() => {
    if (indexOfQuizSelected === null || indexOfQuizSelected === undefined || isQuizEnded) {
      return;
    }
    const currentAllQuizzes = [...allQuizzes];
    const currentQuestion = currentAllQuizzes[indexOfQuizSelected]?.quizQuestions[currentQuestionIndex];
    if (currentQuestion) {
      setScore((current) => current + 1);
      setCorrectAnswersCount((current) => current + 1);
      setAllQuizzes(currentAllQuizzes);
      toast.success('Correct Answer');
      moveToTheNextQuestion();
    } else {
      toast.error('Question data is missing.');
    }
  }, [indexOfQuizSelected, currentQuestionIndex, allQuizzes, setAllQuizzes, moveToTheNextQuestion, isQuizEnded]);

  const handleNextClick = () => {
    if (indexOfQuizSelected === null || indexOfQuizSelected === undefined) {
      toast.error('Quiz not selected properly.');
      return;
    }

    const currentQuestion = allQuizzes[indexOfQuizSelected]?.quizQuestions[currentQuestionIndex];

    if (!currentQuestion) {
      toast.error('Current question not found.');
      return;
    }

    if (selectedChoice === null) {
      toast.error('Please select an answer.');
      return;
    }

    const correctAnswerIndex = currentQuestion.correctAnswer.charCodeAt(0) - 'A'.charCodeAt(0);

    if (selectedChoice === correctAnswerIndex) {
      handleCorrectAnswer();
    } else {
      handleIncorrectAnswer();
    }
  };

  const handleExitQuiz = () => {
    router.push('/quizzes');
  };

  if (!quiz || !quiz.quizQuestions || quiz.quizQuestions.length === 0) {
    return null;
  }

  const currentQuestion = quiz.quizQuestions[currentQuestionIndex] || {};

  if (isQuizEnded) {
    const scorePercentage = (score / quiz.quizQuestions.length) * 100;
    let emojiImage;

    if (scorePercentage === 100) {
      emojiImage = '/star-eyes-emoji.jpg';
    } else if (scorePercentage > 50) {
      emojiImage = '/happy-emoji.jpg';
    } else {
      emojiImage = '/confused-emoji.jpg';
    }

    return (
      <div className="w-full max-w-4xl mx-auto p-4 text-center">
        <div className="mb-4 flex justify-center">
          <Image
            src={emojiImage}
            alt="Result Emoji"
            layout="intrinsic"
            width={150}
            height={150}
            style={{ maxHeight: '150px', maxWidth: '100%' }}
          />
        </div>
        <h2 className="text-3xl font-bold mb-4">Quiz Completed</h2>
        <p className="text-xl mb-4">Your Score: {score}</p>
        <div className="flex justify-center items-center gap-2 mb-2">
          <Image src="/correct_answer.png" alt="Correct Answers" width={20} height={20} />
          <p className="text-lg">Correct Answers: {correctAnswersCount}</p>
        </div>
        <div className="flex justify-center items-center gap-2 mb-2">
          <Image src="/incorrect-answer.png" alt="Incorrect Answers" width={20} height={20} />
          <p className="text-lg">Incorrect Answers: {incorrectAnswersCount}</p>
        </div>
        <button
          onClick={handleExitQuiz}
          className="mt-4 p-2 bg-blue-700 text-white rounded-md"
        >
          Exit Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-gray-100 rounded-md shadow-md">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">{currentQuestion.mainQuestion || 'Loading question...'}</h2>
      <div className="flex flex-col gap-2">
        {currentQuestion.choices && currentQuestion.choices.length > 0 ? (
          currentQuestion.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => selectChoiceFunction(index)}
              className={`p-2 border rounded-md ${selectedChoice === index ? 'bg-blue-700 text-white' : 'bg-white text-black'}`}
              style={{ border: '1px solid black' }}
            >
              {choice.text.includes('https://') ? (
                <div className="flex justify-center">
                  <Image
                    src={choice.text}
                    alt={`Option ${index + 1}`}
                    layout="intrinsic"
                    width={500}
                    height={500}
                    style={{ maxWidth: '100%', maxHeight: 'auto' }}
                  />
                </div>
              ) : (
                choice.text
              )}
            </button>
          ))
        ) : (
          <p>Loading choices...</p>
        )}
      </div>
      <button
        onClick={handleNextClick}
        className="mt-4 p-2 bg-green-700 text-white rounded-md"
      >
        Next
      </button>
    </div>
  );
}

export default QuizStartQuestions;
