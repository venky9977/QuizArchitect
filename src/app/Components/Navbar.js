// app/Components/Navbar.js
'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import useGlobalContextProvider from '../ContextApi';
import Image from 'next/image';
import { auth } from '../firebase';  // Import Firebase Authentication
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';  // Import auth functions

function Navbar() {
  const { loginState } = useGlobalContextProvider();
  const { isLoggedIn, setIsLoggedIn } = loginState;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, username, password);
      setIsLoggedIn(true);
      setShowLogin(false);
    } catch (error) {
      alert('Incorrect username or password');
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleResultsClick = () => {
    window.location.href = 'https://docs.google.com/spreadsheets/d/1CA0InY5jx6ZRVqRAKNQxH_nU_Kn-kIfSEzyRC8bUUCs/edit?gid=0#gid=0';
  };

  return (
    <nav className="bg-blue-700 p-4 text-white flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Image src="/quizapp_icon.png" alt="Quiz App Icon" width={40} height={40} />
        <h1 className="text-2xl font-bold">Quiz Architect</h1>
      </div>
      {isLoggedIn ? (
        <div className="flex gap-4">
          <button onClick={handleResultsClick} className="bg-white text-blue-700 p-2 rounded-md">
            See Results
          </button>
          <button onClick={handleLogout} className="bg-white text-blue-700 p-2 rounded-md">
            Logout
          </button>
        </div>
      ) : (
        <button onClick={() => setShowLogin(true)} className="bg-white text-blue-700 p-2 rounded-md">
          Professor Login
        </button>
      )}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md relative">
            <button onClick={() => setShowLogin(false)} className="absolute top-2 right-2 text-gray-500">
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-black">Professor Login</h2>
            <input
              type="text"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4 text-black"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4 text-black"
            />
            <button onClick={handleLogin} className="bg-blue-700 text-white p-2 w-full rounded-md">
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
