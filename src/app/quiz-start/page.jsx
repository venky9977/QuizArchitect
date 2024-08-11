'use client';

import { useState, useEffect } from "react";
import useGlobalContextProvider from "../ContextApi";
import { useRouter } from "next/navigation";
import QuizStartHeader from "../Components/QuizStartPage/QuizStartHeader";
import QuizStartQuestions from "../Components/QuizStartPage/QuizStartQuestions";

export default function QuizStartPage() {
  const { quizToStartObject, userObject } = useGlobalContextProvider();
  const { selectQuizToStart } = quizToStartObject;
  const { user, setUser } = userObject;
  const [parentTimer, setParentTimer] = useState(120); // 2 minutes in seconds
  const [userName, setUserName] = useState('');
  const [isNameEntered, setIsNameEntered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!selectQuizToStart) {
      router.push('/'); // Redirect to home page if no quiz selected
    }
  }, [selectQuizToStart, router]);

  const handleNameSubmit = () => {
    if (userName.trim() !== '') {
      setIsNameEntered(true);
      setUser((prevUser) => ({ ...prevUser, name: userName }));
    } else {
      alert("Please enter your name.");
    }
  };

  const handleUpdateTime = (currentTime) => {
    setParentTimer(currentTime);
  };

  const handleQuizEnd = () => {
    // Define what happens when the quiz ends
  };

  if (!selectQuizToStart) {
    return null;
  }

  return (
    <div className="poppins flex flex-col px-24 mt-[35px]">
      {!isNameEntered ? (
        <div className="h-screen flex flex-col gap-4 items-center justify-center">
          <h2 className="text-2xl font-bold">Enter Your Name to Start the Quiz</h2>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value.toUpperCase())}
            className="p-2 border border-gray-300 rounded-md"
            placeholder="YOUR NAME"
            style={{ textTransform: 'uppercase' }}
          />
          <button
            onClick={handleNameSubmit}
            className="mt-4 p-2 bg-blue-700 text-white rounded-md"
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <>
          <QuizStartHeader parentTimer={parentTimer} />
          <div className="mt-10 flex items-center justify-center">
            <QuizStartQuestions
              onUpdateTime={handleUpdateTime}
              quiz={selectQuizToStart}
              onQuizEnd={handleQuizEnd}
            />
          </div>
        </>
      )}
    </div>
  );
}
