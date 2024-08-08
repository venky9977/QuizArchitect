// app/page.js
'use client';

import { useState } from "react";
import QuizzesArea from "./Components/QuizzesArea";
import { Toaster } from "react-hot-toast";
import Navbar from "./Components/Navbar";
import Image from "next/image";

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <header className="w-full">
        <Navbar />
      </header>
      {!isStarted ? (
        <div className="flex flex-col items-center justify-center flex-grow bg-white text-black">
          <Image src="/quizapp_icon.png" alt="Quiz App Icon" width={100} height={100} />
          <h1 className="text-5xl font-bold">Welcome to Quiz Architect</h1>
          <button
            onClick={() => setIsStarted(true)}
            className="mt-4 p-4 bg-blue-700 text-white rounded-md"
          >
            Get Started
          </button>
        </div>
      ) : (
        <QuizzesArea />
      )}
    </div>
  );
}
