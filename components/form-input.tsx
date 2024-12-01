import { LuAsterisk } from "react-icons/lu";
import { QuestionType } from "@/contracts/types";

interface FormInputProps {
  question: QuestionType;
}

export default function FormInput({ question }: FormInputProps) {
  return (
    <div>
      <div className="flex flex-col my-[8px]">
        <div className="flex items-center">
          <label htmlFor={question.inputId}>{question.question}</label>
          {question.isRequired && (
            <LuAsterisk className="text-[12px] text-red-600" />
          )}
        </div>
        <input
          className="border border-gray-600 rounded-md py-[2px] placeholder:text-sm placeholder:pl-[10px]"
          type={question.type}
          id={question.inputId}
          name={question.inputId}
          placeholder={question.placeholder}
          {...(question.isRequired ? { required: true } : {})}
        />
      </div>
    </div>
  );
}
