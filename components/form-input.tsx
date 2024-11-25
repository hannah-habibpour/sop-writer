import { QuestionType } from "@/contracts/types";

interface FormInputProps {
  question: QuestionType;
}

export default function FormInput({ question }: FormInputProps) {
  return (
    <div>
      <div className="flex flex-col my-[8px]">
        <label htmlFor={question.inputId}>{question.question}</label>
        <input
          className="border border-gray-300 rounded-md placeholder:text-sm"
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
