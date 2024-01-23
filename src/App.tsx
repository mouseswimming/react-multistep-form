import { FormEvent, useState } from "react";
import AccountForm from "./components/AccountForm";
import AddressForm from "./components/AddressForm";
import UserForm from "./components/UserForm";
import useMultistepForm from "./hooks/useMultistepForm";

type FormData = {
  firstName: string;
  lastName: string;
  age: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  password: string;
};

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password: "",
};

function App() {
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [isFormCompleted, setIsFormCompleted] = useState(false);

  function updateFields(fields: Partial<FormData>) {
    setFormData((prev) => ({ ...prev, ...fields }));
  }

  const {
    currentStepIndex,
    currentStep,
    totalStep,
    next,
    back,
    isFirstStep,
    isLastStep,
  } = useMultistepForm([
    <UserForm {...formData} updateFields={updateFields} />,
    <AddressForm {...formData} updateFields={updateFields} />,
    <AccountForm {...formData} updateFields={updateFields} />,
  ]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!isLastStep()) {
      next();
    } else {
      setIsFormCompleted(true);
    }
  }

  if (isFormCompleted)
    return <h2 className="text-center mt-10">Your account has been created</h2>;

  return (
    <div className="border border-gray-900 rounded-lg p-4 max-w-max m-auto mt-8">
      <form onSubmit={handleSubmit} className="new-account-form">
        <div className="flex justify-end">
          {currentStepIndex + 1} / {totalStep}
        </div>
        {currentStep}
        <div className="mt-4 flex justify-end gap-x-2">
          {!isFirstStep() && (
            <button
              className="border border-gray-700 rounded-md py-2 px-8 hover:bg-slate-100 focus-visible:bg-slate-100 transition-colors duration-100"
              type="button"
              onClick={back}
            >
              Back
            </button>
          )}

          <button
            className="border border-gray-700 rounded-md py-2 px-8 hover:bg-slate-100 focus-visible:bg-slate-100 transition-colors duration-100"
            type="submit"
          >
            {isLastStep() ? "Finish" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
