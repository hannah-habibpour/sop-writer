import { LuAsterisk } from "react-icons/lu";
import { QuestionType } from "@/contracts/types";

interface FormInputProps {
  question: QuestionType;
}

export default function FormInput({ question }: FormInputProps) {
  return (
    <div>
      <div className="flex flex-col my-[8px]">
        <div className="flex justify-between md:justify-normal">
          <label htmlFor={question.inputId}>{question.question}</label>
          {question.isRequired && (
            <LuAsterisk className=" min-w-[12px] text-[12px] text-red-600 self-center" />
          )}
        </div>
        {question.questionType === "input" && (
          <input
            className="border border-gray-600 rounded-md py-[2px] px-[8px] placeholder:text-sm"
            type={question.type}
            id={question.inputId}
            name={question.inputId}
            placeholder={question.placeholder}
            {...(question.isRequired ? { required: true } : {})}
          />
        )}
        {question.questionType === "textarea" && (
          <textarea
            className="border border-gray-600 rounded-md py-[2px] px-[8px] placeholder:text-sm"
            id={question.inputId}
            name={question.inputId}
            placeholder={question.placeholder}
            {...(question.isRequired ? { required: true } : {})}
          />
        )}
      </div>
    </div>
  );
}
