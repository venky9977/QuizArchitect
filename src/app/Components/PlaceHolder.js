//app/Components/PlaceHolder.js
'use client';

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function PlaceHolder() {
  const router = useRouter();

  return (
    <div className="poppins flex-col gap-3 p-4 flex justify-center items-center">
      {/* Icon Container */}
      <Image src="/empty-box.jpg" alt="Empty Box" width={230} height={230} />
      {/* Title */}
      <h2 className="text-2xl font-bold">Quizzes Await! Make One.</h2>
      {/* Call to Action */}
      <span className="text-[13px] font-light">
        Click below to begin your journey here....
      </span>
      {/* Button */}
      <button 
        onClick={() => router.push('/quiz-build')}
        className="p-3 px-4 text-white text-[12px] bg-blue-700 rounded-md"
      >
        Create my first Quiz
      </button>
    </div>
  );
}

export default PlaceHolder;
