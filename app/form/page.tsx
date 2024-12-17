"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import FormInput from "@/components/form-input";

import admissionQuestions from "../../data/admission-questions.json";
import personalQuestions from "../../data/personal-questions.json";
import educationBackgroundQuestions from "../../data/education-background-questions.json";
import professionalExperienceQuestions from "../../data/professional-experience-questions.json";
import professionalObjectiveQuestions from "../../data/professional-objectives-questions.json";

export default function FormPage() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setIsFormVisible(false);

    try {
      // Extract the form data
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData.entries());

      // Send the data to the API endpoint
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // Handle the response
      const result = await res.json();
      setMessage(result.message);
    } catch (error) {
      setMessage(
        "An error occurred while submitting the form. Please try again."
      );
      console.error("Error submitting the form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessage("");
    setIsFormVisible(true);
  };

  return (
    <div className="py-[60px] px-[44px] md:px-[150px] md:py-[100px] items-center">
      {isFormVisible ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
          <div>
            <div className="text-[20px] font-semibold">
              Personal Information
            </div>
            {personalQuestions.map((question) => (
              <FormInput key={question.id} question={question} />
            ))}
          </div>
          <div>
            <div className="text-[20px] font-semibold">
              Education Background
            </div>
            {educationBackgroundQuestions.map((question) => (
              <FormInput key={question.id} question={question} />
            ))}
          </div>
          <div>
            <div className="text-[20px] font-semibold">
              Professional Experiences
            </div>
            {professionalExperienceQuestions.map((question) => (
              <FormInput key={question.id} question={question} />
            ))}
          </div>
          <div>
            <div className="text-[20px] font-semibold">Admission</div>
            {admissionQuestions.map((question) => (
              <FormInput key={question.id} question={question} />
            ))}
          </div>
          <div>
            <div className="text-[20px] font-semibold">
              Professional Objectives
            </div>
            {professionalObjectiveQuestions.map((question) => (
              <FormInput key={question.id} question={question} />
            ))}
          </div>
          <button
            type="submit"
            className={`bg-[#D80621] text-white text-[18px] font-semibold rounded-md py-[8px] max-w-[150px] ${
              isLoading ? "cursor-not-allowed opacity-25" : ""
            }`}
            disabled={isLoading}
          >
            Submit
          </button>
        </form>
      ) : (
        <div>
          {isLoading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-[#D80621]" />
              <p className="text-lg">Submitting your form...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-[14px] p-[66px]">
              <div className="text-center text-lg">{message}</div>
              <button
                onClick={handleReset}
                className="bg-[#D80621] text-white text-[18px] font-semibold rounded-md py-[8px] px-4"
              >
                Back to Form
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
