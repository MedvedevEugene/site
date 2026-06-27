"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { CONTACT_METHOD_PLACEHOLDERS, CONTACT_METHODS, type ContactMethod } from "@/lib/contact-form-data";
import { IC_QUIZ } from "@/lib/individual-consultations-data";
import { buildFullPhoneNumber } from "@/lib/phone-format";
import { DEFAULT_PHONE_COUNTRY } from "@/lib/phone-countries";
import { getPhoneCountryByIso, PhoneCountryInput } from "@/components/forms/PhoneCountryInput";
import "./consultation-quiz.css";

const QUIZ_CONTACT_LABELS: Record<ContactMethod, string> = {
  phone: "Phone",
  telegram: "Telegram",
  whatsapp: "WhatsApp",
  max: "Max",
};

function IconArrowRight() {
  return (
    <svg className="ic-quiz__btn-icon" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3.75 9H14.25" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 14.25L14.25 9L9 3.75" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconArrowLeft() {
  return (
    <svg className="ic-quiz__btn-icon" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M14.25 9H3.75" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 3.75L3.75 9L9 14.25" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function QuizConsultant() {
  return (
    <div className="ic-quiz__consultant-bubble">
      <div>
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
      <div className="ic-quiz__sidebar-main">
        <p className="ic-quiz__sidebar-desc">
          {IC_QUIZ.sidebarDescription}
          <br />
          {IC_QUIZ.sidebarPhone}
        </p>
        <QuizConsultant />
      </div>
      <p className="ic-quiz__sidebar-hint">{IC_QUIZ.footerHint}</p>
    </aside>
  );
}

type QuizFooterProps = {
  stepNumber: number;
  onBack: () => void;
  onNext?: () => void;
  nextDisabled?: boolean;
  submitForm?: boolean;
  submitting?: boolean;
};

function QuizFooter({
  stepNumber,
  onBack,
  onNext,
  nextDisabled = false,
  submitForm = false,
  submitting = false,
}: QuizFooterProps) {
  return (
    <div className="ic-quiz__footer-sticky">
      <div className="ic-quiz__footer">
        <div className="ic-quiz__footer-text">
          <div className="ic-quiz__step-counter">
            <span>Шаг:&nbsp;</span>
            <span>
              {stepNumber}/{IC_QUIZ.totalSteps}
            </span>
          </div>
          <p className="ic-quiz__footer-hint">{IC_QUIZ.footerHint}</p>
        </div>
        <div className="ic-quiz__btn-wrap">
          <button type="button" className="ic-quiz__btn ic-quiz__btn--back" aria-label="Назад" onClick={onBack}>
            <IconArrowLeft />
          </button>
          {submitForm ? (
            <button type="submit" className="ic-quiz__btn ic-quiz__btn--submit" disabled={submitting}>
              <IconArrowRight />
              {submitting ? "Отправка..." : IC_QUIZ.submitLabel}
            </button>
          ) : (
            <button type="button" className="ic-quiz__btn ic-quiz__btn--next" disabled={nextDisabled} onClick={onNext}>
              <IconArrowRight />
              Далее
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

type QuizStepLayoutProps = QuizFooterProps & {
  children: ReactNode;
  question: string;
};

function QuizStepLayout({ children, question, ...footerProps }: QuizStepLayoutProps) {
  return (
    <div className="ic-quiz__wrapper">
      <QuizSidebar />
      <div className="ic-quiz__content">
        <div className="ic-quiz__content-inner">
          <div className="ic-quiz__main">
            <div className="ic-quiz__screen">
              <div className="ic-quiz__header">
                <h3 className="ic-quiz__question">{question}</h3>
              </div>
              {children}
            </div>
            <QuizFooter {...footerProps} />
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizRadioOptions({
  step,
  options,
  value,
  onSelect,
}: {
  step: number;
  options: readonly string[];
  value: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="ic-quiz__options">
      {options.map((option) => (
        <label
          key={option}
          className={`ic-quiz__radio-item${value === option ? " ic-quiz__radio-item--checked" : ""}`}
        >
          <input
            type="radio"
            className="ic-quiz__radio-input"
            name={`quiz-step-${step}`}
            value={option}
            checked={value === option}
            onChange={() => onSelect(option)}
          />
          <span className="ic-quiz__radio-indicator" aria-hidden="true" />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

function QuizContactMethods({
  value,
  onChange,
}: {
  value: ContactMethod;
  onChange: (value: ContactMethod) => void;
}) {
  return (
    <div className="ic-quiz__methods" role="radiogroup" aria-label="Способ связи">
      {CONTACT_METHODS.map((method) => (
        <label
          key={method.id}
          className={`ic-quiz__method${value === method.id ? " ic-quiz__method--active" : ""}`}
        >
          <input
            type="radio"
            className="ic-quiz__method-input"
            name="quiz-contact-method"
            value={method.id}
            checked={value === method.id}
            onChange={() => onChange(method.id)}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={method.icon} alt="" width={18} height={18} className="ic-quiz__method-icon" />
          <span>{QUIZ_CONTACT_LABELS[method.id]}</span>
        </label>
      ))}
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

  const progress = step === 0 ? 0 : Math.min(100, Math.round((step / IC_QUIZ.totalSteps) * 100));

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
          comment: [`Тема: ${answers[0]}`, `Формат: ${answers[1]}`, `Приоритет: ${answers[2]}`].join("\n"),
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
      <div className="ic-quiz__shell">
        <div className="ic-quiz__progress-wrap" aria-hidden="true">
          <div className="ic-quiz__progressbar">
            <span className="ic-quiz__progress" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {step === 0 ? (
          <div className="ic-quiz__wrapper">
            <QuizSidebar />
            <div className="ic-quiz__content">
              <div className="ic-quiz__cover">
                <Image
                  src={IC_QUIZ.coverImage}
                  alt=""
                  fill
                  className="ic-quiz__cover-image object-cover"
                  sizes="(max-width: 768px) 100vw, 1160px"
                  priority
                />
                <div className="ic-quiz__cover-overlay">
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
                    <IconArrowRight />
                    Начать
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {step >= 1 && step <= IC_QUIZ.steps.length ? (
          <QuizStepLayout
            question={IC_QUIZ.steps[step - 1].question}
            stepNumber={step}
            onBack={handleBack}
            onNext={handleNext}
            nextDisabled={!answers[step - 1]}
          >
            <QuizRadioOptions
              step={step}
              options={IC_QUIZ.steps[step - 1].options}
              value={answers[step - 1]}
              onSelect={handleSelect}
            />
          </QuizStepLayout>
        ) : null}

        {step === IC_QUIZ.steps.length + 1 ? (
          <form className="ic-quiz__wrapper" onSubmit={handleSubmit}>
            <QuizSidebar />
            <div className="ic-quiz__content">
              <div className="ic-quiz__content-inner">
                <div className="ic-quiz__main">
                  <div className="ic-quiz__screen">
                    <div className="ic-quiz__header">
                      <h3 className="ic-quiz__question">Как с вами удобнее связаться?</h3>
                    </div>
                    <div className="ic-quiz__form">
                      <input name="name" required placeholder="Ваше имя" className="ic-quiz__input" />
                      <QuizContactMethods value={contactMethod} onChange={setContactMethod} />
                      {usesPhoneInput ? (
                        <div className="ic-quiz__phone">
                          <PhoneCountryInput
                            value={phoneValue}
                            onChange={setPhoneValue}
                            countryIso={phoneCountryIso}
                            onCountryChange={setPhoneCountryIso}
                            inputName="contactValue"
                            inputClassName="ic-quiz__input"
                          />
                        </div>
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
              </div>
            </div>
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
    </div>
  );
}
