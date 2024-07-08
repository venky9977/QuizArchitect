'use client';

import { faCode,faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import useGlobalContextProvider from "@/app/ContextApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import QuizStartHeader from "@/app/Components/QuizStartPage/QuizStartHeader";
import QuizStartQuestions from "@/app/Components/QuizStartPage/QuizStartQuestions";

function Page(props) {
    const { allQuizzes, quizToStartObject } = useGlobalContextProvider();
    const { selectQuizToStart } = quizToStartObject;
    const router = useRouter();

    useEffect(() => {
        if(selectQuizToStart === null){
            router.push('/');
        }
    }, []);
    
    return(
        <div className="poppins flex flex-col px-24 mt-[35px]">
            {selectQuizToStart === null ? (
                <div className=" h-svh flex flex-col gap-2 items-center justify-center">
                    <Image src="/error-icon.png" alt="" width={180} height={180} />
                    <h2 className="text-xl font-bold">
                        Please Select your Quiz First.......
                    </h2>
                    <span className="font-light">
                        You will be redirected to home page
                    </span>
                </div>
            ) : (
                <>
                    <QuizStartHeader />
                    <div className="mt-10 flex items-center justify-center">
                        <QuizStartQuestions />
                    </div>
                </>
            )}
        </div>
    );
}

export default Page;
