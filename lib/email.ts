const RESEND_API = "https://api.resend.com/emails";

type SendResult =
  | { ok: true }
  | { ok: false; skipped: true }
  | { ok: false; skipped: false; error?: string };

function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://psychologydemo-ten.vercel.app")
  );
}

function getFromAddress() {
  return (
    process.env.SMTP_FROM?.trim() ||
    process.env.EMAIL_FROM?.trim() ||
    (process.env.SMTP_USER ? `ИЖСИЗ <${process.env.SMTP_USER}>` : "ИЖСИЗ <onboarding@resend.dev>")
  );
}

function isSmtpConfigured() {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_USER?.trim() &&
      process.env.SMTP_PASS?.trim()
  );
}

async function sendViaSmtp(to: string, subject: string, html: string): Promise<SendResult | null> {
  if (!isSmtpConfigured()) return null;

  const nodemailer = await import("nodemailer");
  const port = Number(process.env.SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!.trim(),
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER!.trim(),
      pass: process.env.SMTP_PASS!.trim(),
    },
  });

  try {
    await transporter.sendMail({
      from: getFromAddress(),
      to,
      subject,
      html,
    });
    return { ok: true };
  } catch (error) {
    console.error("[email/smtp]", error);
    const message = error instanceof Error ? error.message : "SMTP send failed";
    return { ok: false, skipped: false, error: message };
  }
}

async function sendViaResend(to: string, subject: string, html: string): Promise<SendResult | null> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return null;

  const res = await fetch(RESEND_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: getFromAddress(),
      to: [to],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[email/resend]", res.status, text);
    let hint = "";
    try {
      const parsed = JSON.parse(text) as { message?: string };
      if (parsed.message) hint = parsed.message;
    } catch {
      /* ignore */
    }
    return { ok: false, skipped: false, error: hint || `HTTP ${res.status}` };
  }

  return { ok: true };
}

async function sendEmail(to: string, subject: string, html: string): Promise<SendResult> {
  const smtpResult = await sendViaSmtp(to, subject, html);
  if (smtpResult) return smtpResult;

  const resendResult = await sendViaResend(to, subject, html);
  if (resendResult) return resendResult;

  console.log("[email] no provider configured — skip send to", to, subject);
  return { ok: false, skipped: true };
}

export async function sendAuthCodeEmail(email: string, code: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; color: #3b3758;">
      <h2 style="color: #272344;">Вход в инструменты ИЖСИЗ</h2>
      <p>Ваш код для входа:</p>
      <p style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #272344;">${code}</p>
      <p style="color: #666; font-size: 14px;">Код действует 15 минут. Если вы не запрашивали вход — проигнорируйте письмо.</p>
    </div>
  `;

  return sendEmail(email, "Код входа — ИЖСИЗ", html);
}

function markdownToHtml(text: string) {
  return text
    .replace(/^## (.+)$/gm, "<h3 style=\"margin:24px 0 8px;color:#272344;\">$1</h3>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>");
}

const TOOL_LABELS: Record<string, string> = {
  insightograph: "Инсайтограф",
  sixteen_associations: "16 ассоциаций",
  nlu: "НЛУ",
};

export async function sendAiReportEmail(
  email: string,
  tool: string,
  analysis: string,
  sessionId?: string | null
) {
  const toolLabel = TOOL_LABELS[tool] || tool;
  const siteUrl = getSiteUrl();
  const resultLink =
    tool === "sixteen_associations" && sessionId
      ? `${siteUrl}/16-associations/result/${sessionId}`
      : siteUrl;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #3b3758; line-height: 1.6;">
      <h2 style="color: #272344;">Ваш ИИ-разбор: ${toolLabel}</h2>
      <p style="font-size: 13px; color: #888;">Алгоритмический инструмент. Не является консультацией специалиста.</p>
      <div>${markdownToHtml(analysis)}</div>
      ${
        sessionId
          ? `<p style="margin-top: 24px;"><a href="${resultLink}" style="color: #774bd9;">Открыть результат на сайте</a></p>`
          : ""
      }
      <p style="margin-top: 32px; font-size: 13px; color: #888;">
        <a href="${siteUrl}/individual-consultations">Записаться на консультацию</a> — Институт ИЖСИЗ
      </p>
    </div>
  `;

  return sendEmail(email, `ИИ-разбор: ${toolLabel} — ИЖСИЗ`, html);
}
