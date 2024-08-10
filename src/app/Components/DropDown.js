// src/app/Components/DropDown.js
'use client';

import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import useGlobalContextProvider from '../ContextApi';
import { useRouter } from 'next/navigation';

function DropDown(props) {
    const {
        dropDownToggleObject, 
        threeDotsPositionsObject, 
        selectedQuizObject,
        allQuizzes,
        setAllQuizzes,
    } = useGlobalContextProvider();
    const { dropDownToggle, setDropDownToggle } = dropDownToggleObject;
    const { threeDotsPositions } = threeDotsPositionsObject;
    const { selectedQuiz, setSelectedQuiz } = selectedQuizObject;
    const [isDialogOpened, setIsDialogOpened] = useState(false);
    const dropDownRef = useRef(null);
    const router = useRouter();

    const menuItems = [
        { name: 'Modify', icon: faPencil },
        { name: 'Delete', icon: faTrash },
    ];

    useEffect(() => {
        function handleOutsideClick(event) {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                if (!isDialogOpened) {
                    setSelectedQuiz(null);
                }
                setDropDownToggle(false);
            }
        }
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isDialogOpened, setDropDownToggle, setSelectedQuiz]);

    async function deleteTheQuiz() {
        const updatedAllQuizzes = allQuizzes.filter((quiz) => quiz._id !== selectedQuiz._id);

        const res = await fetch(
            `https://quizarchitects.com/api/quizzes?id=${selectedQuiz._id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        if (!res.ok) {
            toast.error('Error while deleting the quiz');
            return;
        }

        setAllQuizzes(updatedAllQuizzes);
        toast.success('The Quiz has been deleted successfully.');
        setIsDialogOpened(false);
        setSelectedQuiz(null);
    }

    function handleClickedItem(menuItem) {
        if (menuItem.name === 'Modify') {
            router.push('/quiz-build');
        }

        if (menuItem.name === 'Delete') {
            setIsDialogOpened(true);
            toast(
                (t) => (
                    <div className='flex flex-col gap-4'>
                        <div>
                            Do you really want to delete the quiz titled &apos;({selectedQuiz.quizTitle})&apos;?
                        </div>
                        <div className='w-full flex gap-3 justify-center'>
                            <button
                                onClick={() => {
                                    deleteTheQuiz();
                                    toast.dismiss(t.id);
                                }}
                                className='bg-blue-700 text-white p-1 w-[100px] rounded-md'>
                                Yes
                            </button>
                            <button
                                className='bg-white text-blue-700 p-1 w-[100px] border border-blue-700 rounded-md hover:text-white hover:bg-blue-700'
                                onClick={() => {
                                    setIsDialogOpened(false);
                                    toast.dismiss(t.id);
                                }}>
                                No
                            </button>
                        </div>
                    </div>
                ),
                {
                    duration: 10000,
                    id: 'deleteQuiz',
                },
            );
        }

        setDropDownToggle(false);
    }

    return (
        <div
            style={{ left: threeDotsPositions.x, top: threeDotsPositions.y }}
            ref={dropDownRef}
            className={`p-4 w-32 fixed z-50 shadow-md flex rounded-lg flex-col gap-3 bg-white poppins poppins-light text-[13px] ${
                dropDownToggle ? 'visible' : 'invisible'
            }`}
        >
            {menuItems.map((menuItem, index) => (
                <div
                    onClick={() => handleClickedItem(menuItem)}
                    key={index}
                    className='flex gap-2 items-center p-2 border text-blue-700 border-gray-200 rounded-md select-none cursor-pointer hover:text-white hover:bg-blue-700'>
                    <FontAwesomeIcon className='size-4' icon={menuItem.icon} />
                    <div className="">{menuItem.name}</div>
                </div>
            ))}
        </div>
    );
}

export default DropDown;
