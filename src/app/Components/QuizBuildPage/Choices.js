// src/app/Components/QuizBuildPage/Choices.js
'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faUpload } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase'; // Import storage from firebase.js

function Choices({ questionIndex, singleQuestion, quizQuestions, setQuizQuestions, onChangeChoice, prefixes, setIsDefaultChoiceType }) {
  const [choiceType, setChoiceType] = useState('default'); // Initialize as default
  const [choices, setChoices] = useState([{ text: '', isImage: false }, { text: '', isImage: false }]);

  useEffect(() => {
    if (singleQuestion.choices.length > 0 && choiceType !== 'default') {
      setChoiceType(singleQuestion.choices[0].isImage ? 'image' : 'text');
      setChoices(singleQuestion.choices);
    } else {
      setChoices([{ text: '', isImage: false }, { text: '', isImage: false }]);
    }
  }, [singleQuestion.choices, choiceType]);

  useEffect(() => {
    setIsDefaultChoiceType(choiceType === 'default');
  }, [choiceType, setIsDefaultChoiceType]);

  async function handleImageUpload(e, choiceIndex) {
    const file = e.target.files[0];
    const storageRef = ref(storage, `quiz-images/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      const newQuizQuestions = JSON.parse(JSON.stringify(quizQuestions));
      if (newQuizQuestions?.[questionIndex]?.choices?.[choiceIndex]) {
        newQuizQuestions[questionIndex].choices[choiceIndex].text = downloadURL;
      }
      setQuizQuestions(newQuizQuestions);
    } catch (error) {
      toast.dismiss();
      toast.error('Error uploading image: ' + error.message);
    }
  }

  function handleChoiceChangeInput(value, choiceIndex, questionIndex, isImage = false) {
    const updatedChoices = choices.map((choice, index) => 
      index === choiceIndex ? { ...choice, text: value, isImage } : choice
    );
    setChoices(updatedChoices);
    onChangeChoice(value, choiceIndex, questionIndex, isImage);
  }

  function handleChoiceTypeChange(e) {
    const selectedType = e.target.value;
    setChoiceType(selectedType);

    if (selectedType !== 'default') {
      const updatedQuestions = quizQuestions.map((question, i) => {
        if (questionIndex === i) {
          return {
            ...question,
            isImageOptions: selectedType === 'image',
            choices: prefixes.slice(0, 2).map(() => ({
              text: '',
              isImage: selectedType === 'image'
            })),
          };
        }
        return question;
      });
      setChoices(updatedQuestions[questionIndex].choices);
      setQuizQuestions(updatedQuestions);
    } else {
      // Reset choices to initial state when "default" is selected
      setChoices([{ text: '', isImage: false }, { text: '', isImage: false }]);
    }
  }

  function handleAddChoice() {
    if (choices.length >= 4) {
      toast.dismiss();
      return toast.error('You can only add up to 4 choices.');
    }
    const newChoice = { text: '', isImage: choiceType === 'image' };
    setChoices([...choices, newChoice]);
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[questionIndex].choices.push(newChoice);
    setQuizQuestions(updatedQuestions);
  }

  function handleDeleteChoice(choiceIndex) {
    if (choices.length <= 2) {
      toast.dismiss();
      return toast.error('You must have at least 2 choices.');
    }
    const updatedChoices = choices.filter((_, index) => index !== choiceIndex);
    setChoices(updatedChoices);
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[questionIndex].choices = updatedChoices;
    setQuizQuestions(updatedQuestions);
  }

  return (
    <div className="mt-3">
      <div className="flex flex-col gap-2">
        <select
          value={choiceType}
          onChange={handleChoiceTypeChange}
          className="border text-[13px] border-gray-200 p-2 rounded-md outline-none"
        >
          <option value="default">Select Choice Type</option>
          <option value="text">Text</option>
          <option value="image">Image</option>
        </select>

        {choiceType !== 'default' && choices.map((singleChoice, choiceIndex) => (
          <div key={choiceIndex} className="flex items-center gap-2 mt-2">
            <span>{prefixes[choiceIndex]}.</span>
            {choiceType === 'image' ? (
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, choiceIndex)}
                  className="hidden"
                  id={`upload-button-${questionIndex}-${choiceIndex}`}
                />
                <label
                  htmlFor={`upload-button-${questionIndex}-${choiceIndex}`}
                  className="bg-blue-700 text-white p-2 rounded-md cursor-pointer"
                >
                  <FontAwesomeIcon icon={faUpload} /> Upload Image
                </label>
                {singleChoice.text && (
                  <div className="relative">
                    <img src={singleChoice.text} alt={`Choice ${choiceIndex}`} className="h-10 w-10 object-cover rounded-md" />
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="absolute top-0 right-0 text-red-600 cursor-pointer"
                      onClick={() => handleChoiceChangeInput('', choiceIndex, questionIndex, true)}
                    />
                  </div>
                )}
              </div>
            ) : (
              <input
                value={singleChoice.text}
                onChange={(e) => handleChoiceChangeInput(e.target.value, choiceIndex, questionIndex, false)}
                className="border text-[13px] border-gray-200 p-2 w-full rounded-md outline-none pr-10"
                placeholder={`Add Your ${prefixes[choiceIndex]} Choice`}
              />
            )}
            {choiceIndex >= 2 && (
              <FontAwesomeIcon
                icon={faXmark}
                className="text-red-600 cursor-pointer"
                onClick={() => handleDeleteChoice(choiceIndex)}
              />
            )}
          </div>
        ))}
        {choiceType !== 'default' && (
          <button
            onClick={handleAddChoice}
            className="mt-2 p-2 bg-green-500 text-white rounded-md"
          >
            Add Choice
          </button>
        )}
      </div>
    </div>
  );
}

export default Choices;
