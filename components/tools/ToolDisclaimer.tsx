"use client";

import { useState } from "react";

export function ToolDisclaimer({ onAccept }: { onAccept: () => void }) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-[20px] p-8 max-w-md w-full shadow-xl">
        <h2 className="font-body text-xl font-medium m-0 mb-4 text-[#272344]">Перед началом</h2>
        <p className="text-sm text-muted m-0 mb-5 leading-relaxed">
          Этот инструмент предназначен для самостоятельного исследования. Он не заменяет работу со
          специалистом и не является медицинской или психотерапевтической консультацией.
        </p>
        <label className="flex items-start gap-3 cursor-pointer mb-6">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="mt-1 shrink-0"
          />
          <span className="text-sm text-[#3b3758]">Я понимаю, что сервис не заменяет консультацию специалиста</span>
        </label>
        <button type="button" className="btn btn-primary w-full" disabled={!checked} onClick={onAccept}>
          Начать
        </button>
      </div>
    </div>
  );
}
