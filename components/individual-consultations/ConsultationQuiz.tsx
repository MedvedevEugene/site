"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { CONTACT_METHOD_PLACEHOLDERS, type ContactMethod } from "@/lib/contact-form-data";
import { IC_QUIZ } from "@/lib/individual-consultations-data";
import { buildFullPhoneNumber } from "@/lib/phone-format";
import { DEFAULT_PHONE_COUNTRY } from "@/lib/phone-countries";
import { ContactMethodPicker } from "@/components/forms/ContactMethodPicker";
import { getPhoneCountryByIso, PhoneCountryInput } from "@/components/forms/PhoneCountryInput";

function QuizConsultant() {
  return (
    <div className="ic-quiz__consultant-bubble">
      <div className="ic-quiz__consultant-meta">
        <span className="ic-quiz__consultant-name">{IC_QUIZ.consultant.name}</span>
        <span className="ic-quiz__consultant-role">{IC_QUIZ.consultant.role}</span>
      </div>
      <p className="ic-quiz__consultant-msg">{IC_QUIZ.consultant.greeting}</p>
    </div>
  );
}

function QuizSidebar() {
  return (
    <aside className="ic-quiz__sidebar">
      <p className="ic-quiz__sidebar-text">
        {IC_QUIZ.sidebarDescription}
        <br />
        {IC_QUIZ.sidebarPhone}
      </p>
      <QuizConsultant />
      <p className="ic-quiz__sidebar-hint">{IC_QUIZ.footerHint}</p>
    </aside>
  );
}

type QuizFooterProps = {
  stepNumber: number;
  onBack: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  submitForm?: boolean;
  submitting?: boolean;
};

function QuizFooter({
  stepNumber,
  onBack,
  onNext,
  nextLabel = "Далее",
  nextDisabled = false,
  submitForm = false,
  submitting = false,
}: QuizFooterProps) {
  return (
    <div className="ic-quiz__footer">
      <div className="ic-quiz__footer-meta">
        <span className="ic-quiz__step-counter">
          Шаг {stepNumber}/{IC_QUIZ.totalSteps}
        </span>
      </div>
      <div className="ic-quiz__footer-actions">
        <button type="button" className="ic-quiz__btn ic-quiz__btn--back" aria-label="Назад" onClick={onBack}>
          ←
        </button>
        {submitForm ? (
          <button type="submit" className="ic-quiz__btn ic-quiz__btn--next" disabled={submitting}>
            {submitting ? "Отправка..." : IC_QUIZ.submitLabel}
          </button>
        ) : (
          <button type="button" className="ic-quiz__btn ic-quiz__btn--next" disabled={nextDisabled} onClick={onNext}>
            {nextLabel} →
          </button>
        )}
      </div>
    </div>
  );
}

type QuizStepLayoutProps = QuizFooterProps & {
  children: ReactNode;
};

function QuizStepLayout({
  children,
  stepNumber,
  onBack,
  onNext,
  nextLabel,
  nextDisabled,
  submitForm,
  submitting,
}: QuizStepLayoutProps) {
  return (
    <div className="ic-quiz__body">
      <div className="ic-quiz__main">
        <div className="ic-quiz__main-inner">{children}</div>
        <QuizFooter
          stepNumber={stepNumber}
          onBack={onBack}
          onNext={onNext}
          nextLabel={nextLabel}
          nextDisabled={nextDisabled}
          submitForm={submitForm}
          submitting={submitting}
        />
      </div>
      <QuizSidebar />
    </div>
  );
}

export function ConsultationQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(["", "", ""]);
  const [contactMethod, setContactMethod] = useState<ContactMethod>("phone");
  const [phoneValue, setPhoneValue] = useState("");
  const [phoneCountryIso, setPhoneCountryIso] = useState(DEFAULT_PHONE_COUNTRY.iso);
  const [submitting, setSubmitting] = useState(false);

  const progress =
    step === 0 ? 0 : Math.min(100, Math.round((step / IC_QUIZ.totalSteps) * 100));

  function handleStart() {
    setStep(1);
  }

  function handleSelect(answer: string) {
    const next = [...answers];
    next[step - 1] = answer;
    setAnswers(next);
  }

  function handleNext() {
    if (step <= IC_QUIZ.steps.length) {
      setStep(step + 1);
    }
  }

  function handleBack() {
    if (step > 0) setStep(step - 1);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const contactValue = data.get("contactValue")?.toString() || "";
    const countryIso = data.get("contactValueCountry")?.toString() || DEFAULT_PHONE_COUNTRY.iso;
    const country = getPhoneCountryByIso(countryIso);
    const phone =
      contactMethod === "phone" || contactMethod === "whatsapp"
        ? buildFullPhoneNumber(country, contactValue)
        : contactValue;

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "consultation-quiz",
          name: data.get("name"),
          phone,
          contact: contactMethod,
          comment: [
            `Тема: ${answers[0]}`,
            `Формат: ${answers[1]}`,
            `Приоритет: ${answers[2]}`,
          ].join("\n"),
        }),
      });
    } catch {
      // show success either way for demo
    } finally {
      setSubmitting(false);
      setStep(IC_QUIZ.steps.length + 2);
    }
  }

  const usesPhoneInput = contactMethod === "phone" || contactMethod === "whatsapp";

  return (
    <div className="ic-quiz">
      <div className="ic-quiz__progress" aria-hidden="true">
        <span className="ic-quiz__progress-bar" style={{ width: `${progress}%` }} />
      </div>

      {step === 0 ? (
        <div className="ic-quiz__cover">
          <Image
            src={IC_QUIZ.coverImage}
            alt=""
            fill
            className="ic-quiz__cover-image object-cover"
            sizes="(max-width: 768px) 100vw, 1160px"
            priority
          />
          <div className="ic-quiz__cover-content">
            <h3 className="ic-quiz__cover-title">
              {IC_QUIZ.coverTitleLines.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </h3>
            <p className="ic-quiz__cover-text">{IC_QUIZ.coverDescription}</p>
            <button type="button" className="ic-quiz__btn ic-quiz__btn--start" onClick={handleStart}>
              Начать
            </button>
          </div>
        </div>
      ) : null}

      {step >= 1 && step <= IC_QUIZ.steps.length ? (
        <QuizStepLayout
          stepNumber={step}
          onBack={handleBack}
          onNext={handleNext}
          nextDisabled={!answers[step - 1]}
        >
          <h3 className="ic-quiz__question">{IC_QUIZ.steps[step - 1].question}</h3>
          <div className="ic-quiz__options">
            {IC_QUIZ.steps[step - 1].options.map((option) => (
              <label
                key={option}
                className={`ic-quiz__option${answers[step - 1] === option ? " ic-quiz__option--selected" : ""}`}
              >
                <input
                  type="radio"
                  name={`quiz-step-${step}`}
                  value={option}
                  checked={answers[step - 1] === option}
                  onChange={() => handleSelect(option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </QuizStepLayout>
      ) : null}

      {step === IC_QUIZ.steps.length + 1 ? (
        <form className="ic-quiz__body ic-quiz__body--form" onSubmit={handleSubmit}>
          <div className="ic-quiz__main">
            <div className="ic-quiz__main-inner">
              <h3 className="ic-quiz__question">Как с вами удобнее связаться?</h3>
              <div className="ic-quiz__form">
                <input name="name" required placeholder="Ваше имя" className="ic-quiz__input" />
                <ContactMethodPicker value={contactMethod} onChange={setContactMethod} className="ic-quiz__methods" />
                {usesPhoneInput ? (
                  <PhoneCountryInput
                    value={phoneValue}
                    onChange={setPhoneValue}
                    countryIso={phoneCountryIso}
                    onCountryChange={setPhoneCountryIso}
                    inputName="contactValue"
                    inputClassName="ic-quiz__input"
                  />
                ) : (
                  <input
                    name="contactValue"
                    required
                    placeholder={CONTACT_METHOD_PLACEHOLDERS[contactMethod] ?? ""}
                    className="ic-quiz__input"
                  />
                )}
              </div>
            </div>
            <QuizFooter
              stepNumber={IC_QUIZ.totalSteps}
              onBack={handleBack}
              submitForm
              submitting={submitting}
            />
          </div>
          <QuizSidebar />
        </form>
      ) : null}

      {step === IC_QUIZ.steps.length + 2 ? (
        <div className="ic-quiz__success">
          <div className="ic-quiz__success-copy">
            <h3 className="ic-quiz__success-title">{IC_QUIZ.successTitle}</h3>
            <p className="ic-quiz__success-text">
              {IC_QUIZ.successTextLines.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
          <div className="ic-quiz__success-image">
            <Image src={IC_QUIZ.successImage} alt="" fill className="object-cover" sizes="400px" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
