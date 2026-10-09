"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import styles from "./SpecialistsPage.module.css";
export function SpecialistLeadForm({ specialist, recruitment = false }: { specialist?: string; recruitment?: boolean }) {
  const [status,setStatus]=useState<"idle"|"sending"|"sent"|"error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if(status === "sending") return;
    const data=new FormData(event.currentTarget); const contact=String(data.get("contact")||"");
    setStatus("sending");
    try {
      const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:recruitment ? "specialist-application" : "specialist-selection",source:specialist ? `specialist:${specialist}` : "specialists",name:data.get("name"),contact,comment:data.get("comment"),metadata:{specialist,privacyConsent:true}})});
      if(!response.ok) throw new Error("Contact failed"); setStatus("sent");
    } catch { setStatus("error"); }
  }
  return <form onSubmit={submit} className={styles.form}>
    <h3>{recruitment ? "Заявка в команду ИЖСИЗ" : specialist ? `Запись к специалисту: ${specialist}` : "Подбор специалиста"}</h3>
    {status === "sent" ? <p role="status">Спасибо! Координатор свяжется с вами.</p> : <>
      <label>Имя<input name="name" autoComplete="name" placeholder="Как к вам обращаться" required /></label>
      <label>Как с вами связаться<input name="contact" placeholder="Телефон, email или мессенджер" required /></label>
      <label>{recruitment ? "Расскажите о себе" : "Кратко о ситуации"}<textarea name="comment" rows={4} placeholder={recruitment ? "Ваш опыт и направления работы" : "Что вы хотите обсудить (необязательно)"} /></label>
      <label className={styles.consent}><input type="checkbox" required /><span>Я согласен с <Link href="/privacy">политикой конфиденциальности</Link></span></label>
      <button className={styles.primary} disabled={status === "sending"}>{status === "sending" ? "Отправляем…" : recruitment ? "Оставить заявку" : specialist ? "Записаться" : "Подобрать специалиста"}</button>
      {status === "error" && <p role="alert">Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с нами по телефону.</p>}
    </>}
  </form>;
}
