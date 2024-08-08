// app/Components/Navbar.js
'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import useGlobalContextProvider from '../ContextApi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Navbar() {
  const { loginState } = useGlobalContextProvider();
  const { isLoggedIn, setIsLoggedIn } = loginState;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    if (username === 'AE' && password === '1234') {
      setIsLoggedIn(true);
      setShowLogin(false);
    } else {
      alert('Incorrect username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleResultsClick = () => {
    router.push('/results');
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
              placeholder="Username"
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
