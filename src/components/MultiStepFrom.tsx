import React, { useState } from "react";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  function onSubmit () {
    alert("Submitted");
  };


  

  return (
    <div>
      {currentStep === 1 && (
        <div className="form-section">
          {/* Render your first set of questions here */}
          <button onClick={handleNextStep}>Next</button>
        </div>
      )}
      {currentStep === 2 && (
        <div className="form-section">
          {/* Render your second set of questions here */}
          <button onClick={handlePrevStep}>Previous</button>
          <button>Submit</button>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
