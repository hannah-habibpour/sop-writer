"use client";

import { useState } from "react";

import FormInput from "@/components/form-input";

import admissionQuestions from "../../data/admission-questions.json";
import personalQuestions from "../../data/personal-questions.json";
import educationBackgroundQuestions from "../../data/education-background-questions.json";
import professionalExperienceQuestions from "../../data/professional-experience-questions.json";
import professionalObjectiveQuestions from "../../data/professional-objectives-questions.json";

export default function FormPage() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
  };

  return (
    <div className="py-[66px] px-[66px] items-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
        <div>
          <div className="text-[20px] font-semibold">Personal Information</div>
          {personalQuestions.map((question) => (
            <FormInput key={question.id} question={question} />
          ))}
        </div>
        <div>
          <div className="text-[20px] font-semibold">Education Background</div>
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
          className="bg-[#D80621] text-white text-[18px] font-semibold rounded-md py-[8px] max-w-[150px]"
        >
          Submit
        </button>
      </form>
      <div>{message}</div>
    </div>
  );
}
