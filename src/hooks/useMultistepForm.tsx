import { ReactElement, useState } from "react";

export default function useMultistepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    if (isLastStep()) return;
    setCurrentStepIndex((index) => index + 1);
  }

  function back() {
    if (isFirstStep()) return;
    setCurrentStepIndex((index) => index - 1);
  }

  function isFirstStep() {
    return currentStepIndex === 0;
  }

  function isLastStep() {
    return currentStepIndex === steps.length - 1;
  }

  return {
    currentStepIndex,
    currentStep: steps[currentStepIndex],
    totalStep: steps.length,
    next,
    back,
    isFirstStep,
    isLastStep,
  };
}
