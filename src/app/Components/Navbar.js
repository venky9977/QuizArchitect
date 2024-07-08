import React from "react";
import Image from "next/image";

function Navbar(props) {
    return (
    <nav className="poppins mx-auto max-w-screen-xl p-4 sm:px-8 sm:py-5 lg:px-10">
        {/* <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8"> */}
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <a className="flex gap-1 items-center">
                <Image 
                src="/quizapp_icon.png"
                alt=""
                width={80}
                height={80}
                />
                <h2 className="text-2xl font-bold flex gap-2">
                  Quiz <span className="text-blue-700">Architect</span>                
                </h2>
              </a>
            </div>
      
            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <button
                className="block rounded-lg bg-blue-700 px-7 py-3 text-sm font-medium text-white"
                type="button"
              >
              Professor Login
              </button>
      
              
            </div>
          {/* </div> */}
        </div>
      </nav>
        
    );
}

export default Navbar;