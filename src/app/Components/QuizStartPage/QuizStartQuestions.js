// src/app/Components/QuizStartPage/QuizStartQuestions.js

'use client';

import React, { useEffect, useState, useRef } from 'react';
import useGlobalContextProvider from '../../ContextApi';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function QuizStartQuestions({ onQuizEnd, onUpdateTime, quiz }) {
  const time = 15;
  const { allQuizzes, setAllQuizzes, userObject } = useGlobalContextProvider();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [indexOfQuizSelected, setIndexOfQuizSelected] = useState(null);
  const [isQuizEnded, setIsQuizEnded] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [incorrectAnswersCount, setIncorrectAnswersCount] = useState(0);
  const { user } = userObject;
  const [timer, setTimer] = useState(time);
  const intervalRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    console.log('All Quizzes:', allQuizzes); // Debugging
    console.log('Quiz:', quiz); // Debugging

    if (quiz && quiz._id && allQuizzes.length > 0) {
      console.log('Looking for quiz with ID:', quiz._id); // Debugging
      const quizIndexFound = allQuizzes.findIndex((q) => q._id === quiz._id);
      if (quizIndexFound === -1) {
        console.error('Quiz not found in allQuizzes');
        toast.error('Quiz not found in allQuizzes');
        return;
      }
      setIndexOfQuizSelected(quizIndexFound);
      console.log('Quiz selected with index:', quizIndexFound); // Debugging
    } else {
      toast.error('Quizzes not loaded properly.');
    }
  }, [allQuizzes, quiz]);

  useEffect(() => {
    if (timer === 0 && !isQuizEnded) {
      handleIncorrectAnswer();
    }
  }, [timer, isQuizEnded, handleIncorrectAnswer]);

  useEffect(() => {
    if (isQuizEnded) {
      quiz.quizQuestions.forEach((quizQuestion) => {
        quizQuestion.answeredResult = -1;
      });
      saveDataIntoDB();
      if (onQuizEnd) onQuizEnd();
    }
  }, [isQuizEnded, onQuizEnd, quiz.quizQuestions, saveDataIntoDB]);

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [currentQuestionIndex, startTimer]);

  const startTimer = () => {
    clearInterval(intervalRef.current);
    setTimer(time);

    intervalRef.current = setInterval(() => {
      setTimer((currentTime) => {
        if (currentTime === 0) {
          clearInterval(intervalRef.current);
          return 0;
        }
        if (onUpdateTime) onUpdateTime(currentTime - 1);
        return currentTime - 1;
      });
    }, 1000);
  };

  const handleCorrectAnswer = () => {
    if (indexOfQuizSelected === null || indexOfQuizSelected === undefined) {
      console.error('Quiz index is not set');
      toast.error('Quiz not selected properly.');
      return;
    }
    const currentAllQuizzes = [...allQuizzes];
    const currentQuestion = currentAllQuizzes[indexOfQuizSelected]?.quizQuestions[currentQuestionIndex];
    if (currentQuestion) {
      currentQuestion.statistics.totalAttempts += 1;
      currentQuestion.statistics.correctAttempts += 1;
      setScore((current) => current + 1);
      setCorrectAnswersCount((current) => current + 1);
      setAllQuizzes(currentAllQuizzes);
      toast.success('Correct Answer');
      moveToTheNextQuestion();
    } else {
      toast.error('Question data is missing.');
    }
  };

  const handleIncorrectAnswer = () => {
    if (indexOfQuizSelected === null || indexOfQuizSelected === undefined) {
      console.error('Quiz index is not set');
      toast.error('Quiz not selected properly.');
      return;
    }
    const currentAllQuizzes = [...allQuizzes];
    const currentQuestion = currentAllQuizzes[indexOfQuizSelected]?.quizQuestions[currentQuestionIndex];
    if (currentQuestion) {
      currentQuestion.statistics.totalAttempts += 1;
      currentQuestion.statistics.incorrectAttempts += 1;
      setIncorrectAnswersCount((current) => current + 1);
      setAllQuizzes(currentAllQuizzes);
      toast.error('Incorrect Answer');
      moveToTheNextQuestion();
    } else {
      toast.error('Question data is missing.');
    }
  };

  const moveToTheNextQuestion = () => {
    if (currentQuestionIndex !== quiz.quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((current) => current + 1);
        setSelectedChoice(null);
      }, 1000);
    } else {
      setIsQuizEnded(true);
      clearInterval(intervalRef.current);
    }
  };

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

    if (currentQuestion.answeredResult === -1) {
      toast.error('Please select an answer.');
      return;
    }

    // Correct answer comparison using text labels (A, B, C, etc.)
    const correctAnswerIndex = currentQuestion.correctAnswer.charCodeAt(0) - 'A'.charCodeAt(0);

    if (currentQuestion.answeredResult === correctAnswerIndex) {
      handleCorrectAnswer();
    } else {
      handleIncorrectAnswer();
    }
  };

  const saveDataIntoDB = () => {
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
  };  

  const handleExitQuiz = () => {
    router.push('/quizzes');
  };

  if (!quiz || !quiz.quizQuestions || quiz.quizQuestions.length === 0) {
    return null;
  }

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
        <div className="mb-4">
          <Image src={emojiImage} alt="Result Emoji" layout="intrinsic" width={150} height={150} style={{ maxHeight: '150px', maxWidth: '100%' }} />
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

  const currentQuestion = quiz.quizQuestions[currentQuestionIndex];

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">{currentQuestion.mainQuestion}</h2>
      <div className="flex flex-col gap-2">
        {currentQuestion.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => selectChoiceFunction(index)}
            className={`p-2 border rounded-md ${selectedChoice === index ? 'bg-blue-700 text-white' : 'bg-white text-black'}`}
          >
            {choice.text.includes('https://') ? (
              <div className="flex justify-center">
                <Image
                  src={choice.text}
                  alt={`Option ${index + 1}`}
                  layout="intrinsic"
                  width={100}
                  height={100}
                  style={{ maxWidth: '100%', maxHeight: 'auto' }}
                />
              </div>
            ) : (
              choice.text
            )}
          </button>
        ))}
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
