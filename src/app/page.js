'use client';

import { useEffect } from "react";
import useGlobalContextProvider from "./ContextApi"; // Correct path assuming ContextApi.js is in src/app
import QuizzesArea from "./Components/QuizzesArea";

export default function Home() {
  const { quizToStartObject } = useGlobalContextProvider();
  const { setSelectQuizToStart } = quizToStartObject;

  useEffect(() => {
    setSelectQuizToStart(null);
  }, [setSelectQuizToStart]);

  return (
    <div>
      <QuizzesArea />
    </div>
  );
}
