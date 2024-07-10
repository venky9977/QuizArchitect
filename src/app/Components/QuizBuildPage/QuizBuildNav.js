import React from "react";
import Image from "next/image";

function QuizBuildNav() {
    return (
        <div className="poppins my-12 flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <Image src="/quiz-builder-icon.png" alt="" height={50} width={50} />
                <span className="text-2xl">
                    Quiz <span className="text-green-700 font-bold">Builder</span>
                </span>
            </div>
            <button className="p2- px-4 bg-green-700 rounded-md text-white">
                Sace
            </button>
        </div>
    );
}

export default QuizBuildNav;