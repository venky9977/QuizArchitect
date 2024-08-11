// app/Components/PlaceHolder.js
'use client';

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useGlobalContextProvider from '../ContextApi';

function PlaceHolder() {
  const router = useRouter();
  const { loginState } = useGlobalContextProvider();
  const { isLoggedIn } = loginState;

  return (
    <div className="poppins flex-col gap-3 p-4 flex justify-center items-center">
      {/* Icon Container */}
      <Image src="/empty-box.jpg" alt="Empty Box" width={230} height={230} />
      {/* Title */}
      <h2 className="text-2xl font-bold">No Quizzes Yet! New Quizzes will show up here</h2>
      {/* Conditionally Render Call to Action and Button */}
      {isLoggedIn && (
        <>
          <span className="text-[13px] font-light">
            Click below to begin your journey here....
          </span>
          <button 
            onClick={() => router.push('/quiz-build')}
            className="p-3 px-4 text-white text-[12px] bg-blue-700 rounded-md"
          >
            Create my first Quiz
          </button>
        </>
      )}
    </div>
  );
}

export default PlaceHolder;
