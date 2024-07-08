'use client';

import { useEffect } from "react";
import Navbar from "./Components/Navbar";
import useGlobalContextProvider from "./ContextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { faCode, faEllipsis, faPlay } from "@fortawesome/free-solid-svg-icons";
import QuizzesArea from "./Components/QuizzesArea";

export default function Home() {

  const {quizToStartObject} = useGlobalContextProvider();
  const { setSelectQuizToStart } = quizToStartObject;

  useEffect(() => {
    setSelectQuizToStart(null);
  }, []);

  return (
    <div>
      <header>
        <Navbar/>
      </header>
      <QuizzesArea/>
    </div>
  );
}
