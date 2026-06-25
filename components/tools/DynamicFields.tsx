"use client";

export function DynamicFields({
  values,
  onChange,
  minFields = 3,
  placeholder = "Ваш ответ...",
}: {
  values: string[];
  onChange: (next: string[]) => void;
  minFields?: number;
  placeholder?: string;
}) {
  const fields = values.length >= minFields ? values : [...values, ...Array(minFields - values.length).fill("")];

  function update(index: number, value: string) {
    const next = [...fields];
    next[index] = value;
    onChange(next);
  }

  function addField() {
    onChange([...fields, ""]);
  }

  function removeField(index: number) {
    if (fields.length <= minFields) return;
    onChange(fields.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-3">
      {fields.map((value, index) => (
        <div key={index} className="flex gap-2">
          <input
            value={value}
            onChange={(e) => update(index, e.target.value)}
            placeholder={`${placeholder} ${index + 1}`}
            className="tool-input flex-1"
          />
          {fields.length > minFields && (
            <button
              type="button"
              className="tool-btn-ghost shrink-0"
              onClick={() => removeField(index)}
              aria-label="Удалить поле"
            >
              ×
            </button>
          )}
        </div>
      ))}
      <button type="button" className="tool-btn-add self-start" onClick={addField}>
        + Добавить поле
      </button>
    </div>
  );
}
