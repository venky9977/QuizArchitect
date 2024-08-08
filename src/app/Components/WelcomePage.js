'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

function WelcomePage({ onGetStarted }) {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-blue-100">
      <h1 className="text-5xl font-bold mb-8">Welcome to Quiz Architect</h1>
      <button
        onClick={onGetStarted}
        className="p-4 bg-blue-700 text-white rounded-md text-xl"
      >
        Get Started
      </button>
    </div>
  );
}

export default WelcomePage;
