// app/Components/ProfessorLogin.js
'use client';

import { useState } from "react";
import useGlobalContextProvider from "../ContextApi";
import { Toaster } from "react-hot-toast";

export default function ProfessorLogin() {
  const { setIsProfessorLoggedIn } = useGlobalContextProvider();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "Elentukh" && password === "AElentukh") {
      setIsProfessorLoggedIn(true);
      alert("Logged in successfully");
    } else {
      alert("Incorrect username or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Toaster />
      <h1 className="text-3xl font-bold mb-4">Professor Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-2 p-2 border border-gray-300 rounded-md"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded-md"
      />
      <button
        onClick={handleLogin}
        className="p-2 bg-blue-700 text-white rounded-md"
      >
        Login
      </button>
    </div>
  );
}
