// src/app/Components/QuizResultsPage.js
'use client';

import React from 'react';
import useGlobalContextProvider from '../ContextApi';

function QuizResultsPage() {
  const { quizResultsState } = useGlobalContextProvider();
  const { quizResults } = quizResultsState;

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
      <table className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-700 text-white">
          <tr>
            <th className="p-2">Quiz Title</th>
            <th className="p-2">Name</th>
            <th className="p-2">Score</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {quizResults.map((result, index) => (
            <tr key={index} className="border-t">
              <td className="p-2">{result.quizTitle}</td>
              <td className="p-2">{result.name}</td>
              <td className="p-2">{result.score}</td>
              <td className="p-2">{result.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QuizResultsPage;
