// app/quizzes/page.jsx
'use client';

import React from 'react';
import Navbar from '../Components/Navbar';
import QuizzesArea from '../Components/QuizzesArea';
import { Toaster } from 'react-hot-toast';

export default function QuizzesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <header className="w-full">
        <Navbar />
      </header>
      <main className="flex-grow">
        <QuizzesArea />
      </main>
    </div>
  );
}
