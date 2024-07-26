'use client';

import { useEffect } from "react";
import useGlobalContextProvider from "./ContextApi"; // Correct path assuming ContextApi.js is in src/app
import QuizzesArea from "./Components/QuizzesArea";
import { Toaster } from "react-hot-toast";
import Navbar from "./Components/Navbar";

export default function Home() {
  const { quizToStartObject, selectedQuizObject } = useGlobalContextProvider();
  const { setSelectQuizToStart } = quizToStartObject;
  const { selectedQuiz, setSelectedQuiz } = selectedQuizObject; 

  useEffect(() => {
    setSelectQuizToStart(null);
    //set the selectedQuiz back to null
    setSelectedQuiz(null);
  }, []);

  return (
    <div>
      <Toaster />
      <header>
        <Navbar/>
      </header>
      <QuizzesArea />
    </div>
  );
}
