//app/results/page.jsx
'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import useGlobalContextProvider from '../ContextApi';

function ResultsPage() {
  const { userObject } = useGlobalContextProvider();
  const { user } = userObject;
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (user.role !== 'professor') {
      router.push('/'); // Redirect to home page if not a professor
    } else {
      fetchResults();
    }
  }, [user]);

  const fetchResults = async () => {
    try {
      const response = await fetch('/api/quizResults');
      if (!response.ok) {
        throw new Error('Failed to fetch results');
      }
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-md rounded-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Quiz Title</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{result.quizTitle}</td>
                  <td className="px-4 py-2">{result.name}</td>
                  <td className="px-4 py-2">{result.score}</td>
                  <td className="px-4 py-2">{result.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default ResultsPage;
