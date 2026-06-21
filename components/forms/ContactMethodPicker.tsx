"use client";

import { CONTACT_METHODS, type ContactMethod } from "@/lib/contact-form-data";

interface ContactMethodPickerProps {
  value: ContactMethod;
  onChange: (value: ContactMethod) => void;
  className?: string;
}

export function ContactMethodPicker({ value, onChange, className = "" }: ContactMethodPickerProps) {
  return (
    <div className={`contact-method-picker ${className}`.trim()} role="radiogroup" aria-label="Способ связи">
      {CONTACT_METHODS.map((method) => (
        <label
          key={method.id}
          className={`contact-method-picker__item${value === method.id ? " contact-method-picker__item--active" : ""}`}
        >
          <input
            type="radio"
            name="contact-method"
            value={method.id}
            checked={value === method.id}
            onChange={() => onChange(method.id)}
            className="contact-method-picker__input"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={method.icon} alt="" width={18} height={18} className="contact-method-picker__icon" />
          <span className="contact-method-picker__label">{method.label}</span>
        </label>
      ))}
    </div>
  );
}
