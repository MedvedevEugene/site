"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const [dropdownStyle, setDropdownStyle] = useState<{ top: number; left: number; width: number } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLButtonElement>(null);

  const country = useMemo(
    () => PHONE_COUNTRIES.find((item) => item.iso === countryIso) ?? DEFAULT_PHONE_COUNTRY,
    [countryIso],
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (!rootRef.current?.contains(target) && !(target instanceof Element && target.closest(".phone-country-input__dropdown"))) {
        setOpen(false);
      }
    }

    function updateDropdownPosition() {
      if (!selectRef.current) return;
      const rect = selectRef.current.getBoundingClientRect();
      setDropdownStyle({
        top: rect.bottom + 4,
        left: rect.left,
        width: Math.max(rect.width, 320),
      });
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", updateDropdownPosition);
    window.addEventListener("scroll", updateDropdownPosition, true);

    if (open) updateDropdownPosition();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", updateDropdownPosition);
      window.removeEventListener("scroll", updateDropdownPosition, true);
    };
  }, [open]);

  function selectCountry(next: PhoneCountry) {
    onCountryChange(next.iso);
    onChange("");
    setOpen(false);
  }

  function toggleDropdown() {
    setOpen((prev) => {
      const next = !prev;
      if (next && selectRef.current) {
        const rect = selectRef.current.getBoundingClientRect();
        setDropdownStyle({
          top: rect.bottom + 4,
          left: rect.left,
          width: Math.max(rect.width, 320),
        });
      }
      return next;
    });
  }

  const dropdown =
    open &&
    dropdownStyle &&
    createPortal(
      <ul
        className="phone-country-input__dropdown"
        role="listbox"
        style={{
          position: "fixed",
          top: dropdownStyle.top,
          left: dropdownStyle.left,
          width: dropdownStyle.width,
        }}
      >
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
      </ul>,
      document.body,
    );

  return (
    <>
      <div ref={rootRef} className={`phone-country-input ${className}`.trim()}>
        <div className="phone-country-input__select-wrap">
          <button
            ref={selectRef}
            type="button"
            className="phone-country-input__select"
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={toggleDropdown}
          >
            <CountryFlag sprite={country.sprite} label={country.label} />
            <span className="phone-country-input__code">{country.code}</span>
            <span className="phone-country-input__caret" aria-hidden="true">
              ▾
            </span>
          </button>
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
      {dropdown}
    </>
  );
}

export function getPhoneCountryByIso(iso: string): PhoneCountry {
  return PHONE_COUNTRIES.find((item) => item.iso === iso) ?? DEFAULT_PHONE_COUNTRY;
}

export function getPhoneDigits(value: string): string {
  return stripPhoneDigits(value);
}
