// src/app/Components/DropDown.js
'use client';

import { faPencil, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import toast from 'react-hot-toast';
import useGlobalContextProvider from '../ContextApi';
import { useRouter } from 'next/navigation';

function DropDown({ isOpen, onClose }) {
    const {
        selectedQuizObject,
        allQuizzes,
        setAllQuizzes,
    } = useGlobalContextProvider();
    const { selectedQuiz, setSelectedQuiz } = selectedQuizObject;
    const router = useRouter();

    const menuItems = [
        { name: 'Modify', icon: faPencil },
        { name: 'Delete', icon: faTrash },
    ];

    if (!isOpen) {
        return null;
    }

    async function deleteTheQuiz() {
        const updatedAllQuizzes = allQuizzes.filter((quiz) => quiz._id !== selectedQuiz._id);

        const res = await fetch(
            `https://quizarchitect.vercel.app/api/quizzes?id=${selectedQuiz._id}`,
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
        setSelectedQuiz(null);
        onClose();
    }

    function handleClickedItem(menuItem) {
        if (menuItem.name === 'Modify') {
            router.push('/quiz-build');
        }

        if (menuItem.name === 'Delete') {
            deleteTheQuiz();
        }

        onClose();
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-80">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <h3 className="text-lg font-semibold mb-4 text-center">Choose an action</h3>
                <div className="flex flex-col gap-3">
                    {menuItems.map((menuItem, index) => (
                        <div
                            onClick={() => handleClickedItem(menuItem)}
                            key={index}
                            className='flex gap-2 items-center p-2 border text-blue-700 border-gray-200 rounded-md select-none cursor-pointer hover:text-white hover:bg-blue-700'>
                            <FontAwesomeIcon className='size-4' icon={menuItem.icon} />
                            <div>{menuItem.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DropDown;
