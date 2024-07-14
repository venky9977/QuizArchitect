'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { quizzesData } from "./QuizzesData";

const GlobalContext = createContext();

export function ContextProvider({ children }) {
    const defaultUser = {
        id: 1,
        name: 'quizUser',
        isLogged: false,
        experience: 0,
    };

    const [allQuizzes, setAllQuizzes] = useState([]);
    const [selectQuizToStart, setSelectQuizToStart] = useState(null);
    const [user, setUser] = useState(defaultUser);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedUserData = localStorage.getItem('user');
            if (savedUserData) {
                setUser(JSON.parse(savedUserData));
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    useEffect(() => {
        setAllQuizzes(quizzesData);
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                allQuizzes,
                setAllQuizzes,
                quizToStartObject: { selectQuizToStart, setSelectQuizToStart },
                userObject: { user, setUser },
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default function useGlobalContextProvider() {
    return useContext(GlobalContext);
}
