// src/app/ContextApi.js
'use client';

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const GlobalContext = createContext();

export function ContextProvider({ children }) {
    const defaultUser = {
        id: 1,
        name: '',
        isLogged: false,
        experience: 0,
    };

    const [allQuizzes, setAllQuizzes] = useState([]);
    const [selectQuizToStart, setSelectQuizToStart] = useState(null);
    const [user, setUser] = useState(defaultUser);
    const [openIconBox, setOpenIconBox] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState({ faIcon: "faQuestion" });
    const [dropDownToggle, setDropDownToggle] = useState(false);
    const [threeDotsPositions, setThreeDotsPositions] = useState({ x: 0, y: 0 });
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedUserData = localStorage.getItem('user');
            if (savedUserData) {
                const userData = JSON.parse(savedUserData);
                setUser({
                    ...userData,
                    isLogged: true,
                });
            } else {
                setUser(defaultUser);
            }
        }
    }, [defaultUser]);

    useEffect(() => {
        const fetchAllQuizzes = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/quizzes`, {
                    cache: 'no-cache',
                });

                if (!response.ok) {
                    toast.error('Something went wrong....');
                    throw new Error('fetching failed....');
                }

                const quizzesData = await response.json();
                setAllQuizzes(quizzesData.quizzes);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllQuizzes();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: 'quizUser',
                        isLogged: false,
                    }),
                });

                if (!response.ok) {
                    toast.error('Something went wrong....');
                    throw new Error('fetching failed....');
                }

                const userData = await response.json();
                if (userData.message === 'User already exists') {
                    setUser(userData.user);
                } else {
                    setUser(userData.user);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                allQuizzes,
                setAllQuizzes,
                quizToStartObject: { selectQuizToStart, setSelectQuizToStart },
                userObject: { user, setUser },
                openBoxToggle: { openIconBox, setOpenIconBox },
                selectedIconObject: { selectedIcon, setSelectedIcon },
                dropDownToggleObject: { dropDownToggle, setDropDownToggle },
                threeDotsPositionsObject: { threeDotsPositions, setThreeDotsPositions },
                selectedQuizObject: { selectedQuiz, setSelectedQuiz },
                loginState: { isLoggedIn, setIsLoggedIn }
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default function useGlobalContextProvider() {
    return useContext(GlobalContext);
}
