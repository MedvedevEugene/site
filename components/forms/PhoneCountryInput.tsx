"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_PHONE_COUNTRY, PHONE_COUNTRIES, type PhoneCountry } from "@/lib/phone-countries";
import { formatPhoneByCountry, stripPhoneDigits } from "@/lib/phone-format";

interface PhoneCountryInputProps {
  value: string;
  onChange: (value: string) => void;
  countryIso: string;
  onCountryChange: (iso: string) => void;
  inputName?: string;
  required?: boolean;
  className?: string;
  inputClassName?: string;
}

function CountryFlag({ sprite, label }: { sprite: string; label: string }) {
  return (
    <span
      className="phone-country-input__flag"
      style={{ backgroundPosition: sprite }}
      aria-hidden="true"
      title={label}
    />
  );
}

export function PhoneCountryInput({
  value,
  onChange,
  countryIso,
  onCountryChange,
  inputName = "phone",
  required = true,
  className = "",
  inputClassName = "",
}: PhoneCountryInputProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const country = useMemo(
    () => PHONE_COUNTRIES.find((item) => item.iso === countryIso) ?? DEFAULT_PHONE_COUNTRY,
    [countryIso],
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectCountry(next: PhoneCountry) {
    onCountryChange(next.iso);
    onChange("");
    setOpen(false);
  }

  return (
    <div ref={rootRef} className={`phone-country-input ${className}`.trim()}>
      <div className="phone-country-input__select-wrap">
        <button
          type="button"
          className="phone-country-input__select"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <CountryFlag sprite={country.sprite} label={country.label} />
          <span className="phone-country-input__code">{country.code}</span>
          <span className="phone-country-input__caret" aria-hidden="true">
            ▾
          </span>
        </button>

        {open && (
          <ul className="phone-country-input__dropdown" role="listbox">
            {PHONE_COUNTRIES.map((item) => (
              <li key={item.iso}>
                <button
                  type="button"
                  role="option"
                  aria-selected={item.iso === country.iso}
                  className={`phone-country-input__option${item.iso === country.iso ? " phone-country-input__option--active" : ""}`}
                  onClick={() => selectCountry(item)}
                >
                  <CountryFlag sprite={item.sprite} label={item.label} />
                  <span className="phone-country-input__option-label">{item.label}</span>
                  <span className="phone-country-input__option-code">{item.code}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <input
        name={inputName}
        required={required}
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        value={value}
        placeholder={country.placeholder}
        className={`phone-country-input__field ${inputClassName}`.trim()}
        onChange={(event) => onChange(formatPhoneByCountry(event.target.value, country))}
      />
      <input type="hidden" name={`${inputName}Country`} value={country.iso} />
    </div>
  );
}

export function getPhoneCountryByIso(iso: string): PhoneCountry {
  return PHONE_COUNTRIES.find((item) => item.iso === iso) ?? DEFAULT_PHONE_COUNTRY;
}

export function getPhoneDigits(value: string): string {
  return stripPhoneDigits(value);
}
