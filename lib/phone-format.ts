import type { PhoneCountry } from "@/lib/phone-countries";

export function stripPhoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function getLocalPhoneTemplate(country: PhoneCountry): string {
  return country.mask.startsWith(country.code)
    ? country.mask.slice(country.code.length)
    : country.placeholder;
}

export function formatPhoneByCountry(raw: string, country: PhoneCountry): string {
  const digits = stripPhoneDigits(raw).slice(0, country.maxDigits);
  const template = getLocalPhoneTemplate(country);
  let digitIndex = 0;
  let result = "";

  for (const char of template) {
    if (char === "0") {
      if (digitIndex >= digits.length) break;
      result += digits[digitIndex++];
      continue;
    }

    if (digitIndex > 0) result += char;
  }

  return result;
}

export function buildFullPhoneNumber(country: PhoneCountry, localValue: string): string {
  const digits = stripPhoneDigits(localValue);
  if (!digits) return "";
  return `${country.code.replace(/\s/g, "")}${digits}`;
}
