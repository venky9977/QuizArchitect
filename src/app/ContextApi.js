'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { quizzesData } from "./QuizzesData";
import { faIcons, faL, faQuestion } from "@fortawesome/free-solid-svg-icons";

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
    //const [user, setUser] = useState(defaultUser);
    const [user, setUser] = useState(() => {
        const saveUserData = localStorage.getItem('user');
        return saveUserData ? JSON.parse(saveUserData) : defaultUser;
    });
    const [openIconBox, setOpenIconBox ] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [selectedIcon, setSelectedIcon ] = useState({ faIcon: faQuestion });
    
    const [dropDownToggle, setDropDownToggle ] = useState(false);
    const [threeDotsPositions, setThreeDotsPositions] = useState({ x: 0, y: 0});
    

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         const savedUserData = localStorage.getItem('user');
    //         if (savedUserData) {
    //             setUser(JSON.parse(savedUserData));
    //         }
    //     }
    // }, []);

    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         localStorage.setItem('user', JSON.stringify(user));
    //     }
    // }, [user]);

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
