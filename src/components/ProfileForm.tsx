import React, { useState } from 'react'

const ProfileForm: React.FC = () => {

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    

    const questions = [
        {
          text: "Enter Your Email?",
          key: "email",
          inputType: "text",
        },
        {
          text: "Enter a Password?",
          key: "password",
          inputType: "text",
        },
        {
          text: "What's your name?",
          key: "name",
          inputType: "text",
        },
        {
          text: "How old are you?",
          key: "age",
          inputType: "number",
        },
        {
          text: "What's your weight (in kg)?",
          key: "weight",
          inputType: "number",
        },
        {
          text: "How much time can you dedicate to workouts?",
          key: "workoutTime",
          inputType: "radio",
          options: ["Less than 30 minutes", "30 to 60 minutes", "More than 60 minutes"],
        },
        {
          text: "What are your fitness goals?",
          key: "fitnessGoals",
          inputType: "radio",
          options: ["Weight loss", "Muscle gain", "Overall health"],
        },
        {
         text: "What's your exercise level?",
         key: "exerciseLevel",
         inputType: "radio",
         options: ["Beginner", "Intermediate", "Advanced"],
            
          },
        // Add more questions...
      ];

      const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          // Handle form submission
          console.log("Answers:", answers);
        }
      };
      
      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const question = questions[currentQuestionIndex];
        if (typeof question === 'object' && 'key' in question) {
          const key = question.key;
          const newAnswers = { ...answers, [key]: event.target.value };
          setAnswers(newAnswers);
        }
      };

      const renderInput = () => {
        if (currentQuestionIndex < questions.length) {
          const question = questions[currentQuestionIndex];
      
          if (typeof question === 'object' && 'inputType' in question) {
            return (
              <>
                <p className="mb-6 text-lg text-gray-800">{question.text}</p>
                {question.inputType === 'text' || question.inputType === 'number' ? (
                  <input
                    type={question.inputType}
                    value={(answers as Record<string, string>)[question.key] || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  />
                ) : (
                  // Handle other input types (e.g., radio, select, text area) here...
                  // You can add more cases based on the input types you want to support
                  // For example, radio buttons:
                  question.inputType === 'radio' && question.options ? (
                    <div className="flex flex-col space-y-2">
                      {question.options.map((option: string) => (
                        <label key={option} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name={question.key}
                            value={option}
                            onChange={handleInputChange}
                            checked={(answers as Record<string, string>)[question.key] === option}
                            className="text-blue-500 focus:ring-blue-300"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  ) : null
                )}
              </>
            );
          } else if (typeof question === 'string') {
            return <p className="mb-6 text-lg text-gray-800">{question}</p>;
          }
        }
      
        return null; // Return null when all questions have been answered
      };
    




  return (

    <div className="text-center p-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-700">
        Let's build your fitness profile
      </h2>
      <p className="text-gray-500 mb-8">{currentQuestionIndex + 1}/{questions.length}</p>
      <div className="max-w-md mx-auto">
        {renderInput()}
        <button
          onClick={nextQuestion}
          className="mt-4 py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full"
        >
          {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>

  )
}

export default ProfileForm