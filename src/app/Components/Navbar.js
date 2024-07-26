'use client';

import React from "react";
import Image from "next/image";
import useGlobalContextProvider from "../ContextApi";
import toast from "react-hot-toast";

function Navbar(props) {
    const { userObject } = useGlobalContextProvider();
    const { user, setUser } = userObject;

    async function changeTheLoginState() {
        console.log(user);
        const userCopy = { ...user };
        userCopy.isLogged = !userCopy.isLogged;
        console.log(userCopy);
        try {
            const response = await fetch(
                `http://localhost:3000/api/user?id=${userCopy._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({ updateUser: userCopy }),
                },
            );

            if (!response.ok) {
                toast.error('Something went wrong...');
                throw new Error('fetching failed...');
            }

            setUser(userCopy);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <nav className="poppins mx-auto max-w-screen-xl p-4 sm:px-8 sm:py-5 lg:px-10 bg-blue-700 text-white">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div className="text-center sm:text-left">
                    <a className="flex gap-1 items-center" href="/">
                        <Image 
                            src="/quizapp_icon.png"
                            alt="Quiz App Icon"
                            width={80}
                            height={80}
                        />
                        <h2 className="text-2xl font-bold flex gap-2">
                            Quiz <span className="text-blue-300">Architect</span>
                        </h2>
                    </a>
                </div>
                <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                    {user.isLogged && (
                        <div className="flex gap-2">
                            <span>Welcome: {user.name}</span>
                        </div>
                    )}
                    <button
                        className="block rounded-lg bg-blue-300 px-7 py-3 text-sm font-medium text-white"
                        type="button"
                        onClick={() => {
                            changeTheLoginState();
                        }}
                    >
                        {user.isLogged ? 'Log out' : 'Log in'}
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
