import admissionQuestions from "../../data/admission-questions.json";
import personalQuestions from "../../data/personal-questions.json";
import educationBackgroundQuestions from "../../data/education-background-questions.json";
import professionalExperienceQuestions from "../../data/professional-experience-questions.json";
import professionalObjectiveQuestions from "../../data/professional-objectives-questions.json";

import FormInput from "@/components/form-input";

export default function FormPage() {
  return (
    <div>
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
        <div className="text-[20px] font-semibold">Profassional Objectives</div>
        {professionalObjectiveQuestions.map((question) => (
          <FormInput key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
}
