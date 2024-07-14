import { icon } from "@fortawesome/fontawesome-svg-core";
import { faCode } from "@fortawesome/free-solid-svg-icons";

export const quizzesData = [
    {
        id:1,
        icon: faCode,
        quizTitle: 'Javascript Quiz 1',
        quizQuestions: [
            {
                id: 1,
                mainQuestion: 'What is Javascript?',
                choices: [
                    'A. To style HTML Ele',
                    'B. To add interactivity',
                    'C. server side code ',
                    'D. to do stufff',
                ],
                correctAnswer: 1,
                //B. to add interactivity
                answeredResult: -1,
                statistics: {
                    totalAttempts: 0,
                    correctAttempts: 0,
                    incorrectAttempts: 0,
                },
            },
            {
                id: 2,
                mainQuestion: 'keyword to declare variable Javascript?',
                choices: [
                    'A. var',
                    'B. let',
                    'C. int',
                    'D. variable',
                ],
                correctAnswer: 1,
                //B. let
                answeredResult: -1,
                statistics: {
                    totalAttempts: 2,
                    correctAttempts: 1,
                    incorrectAttempts: 1,
                },
            }
        ],
    },
    {
        id:2,
        icon: faCode,
        quizTitle: 'Javascript Quiz 2',
        quizQuestions: [
            {
                id: 1,
                mainQuestion: 'What is Javascript?',
                choices: [
                    'A. To style HTML Ele',
                    'B. To add interactivity',
                    'C. server side code ',
                    'D. to do stufff',
                ],
                correctAnswer: 1,
                //B. to add interactivity
                answeredResult: -1,
                statistics: {
                    totalAttempts: 3,
                    correctAttempts: 3,
                    incorrectAttempts: 0,
                },
            },
            {
                id: 2,
                mainQuestion: 'keyword to declare variable Javascript?',
                choices: [
                    'A. var',
                    'B. let',
                    'C. int',
                    'D. variable',
                ],
                correctAnswer: 1,
                //B. let
                answeredResult: -1,
                statistics: {
                    totalAttempts: 2,
                    correctAttempts: 1,
                    incorrectAttempts: 1,
                },
            }
        ],
    }
];