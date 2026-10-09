import Link from "next/link";
import { SpecialistCard } from "./SpecialistCard";
import { SpecialistPhoto } from "./SpecialistPhoto";
import { SpecialistLeadForm } from "./SpecialistLeadForm";
import type { SpecialistProfile } from "@/lib/specialists-data";
import styles from "./SpecialistsPage.module.css";
export function SpecialistsPage({ specialists }: { specialists: SpecialistProfile[] }) {
  const hero=[specialists.find(s=>s.slug==="ekaterina-skulochenko"),specialists.find(s=>s.slug==="asya-bykovskaya"),specialists.find(s=>s.slug==="regina-karimulina")].filter((s):s is SpecialistProfile=>Boolean(s));
  return <div className={styles.page}>
    <section className={`${styles.container} ${styles.hero}`}>
      <div><p className={styles.eyebrow}>Специалисты института</p><h1>Специалисты ИЖСИЗ</h1><p className={styles.intro}>Психологи, системные расстановщики, преподаватели и ведущие групп. Узнайте, с какими запросами работает каждый специалист, в каких форматах принимает и какие программы ведёт.</p><div className={styles.actions}><a href="#selection" className={styles.primary}>Подобрать специалиста</a><a href="#specialists" className={styles.outline}>Смотреть специалистов ↓</a></div><p className={styles.note}>Специалисты института могут совмещать психологическую практику, преподавание и ведение групп.</p></div>
      <div className={styles.portraits} aria-label="Специалисты института">{hero.map(s=><Link href={`/teachers/${s.slug}`} key={s.slug} className={styles.portrait}><SpecialistPhoto name={s.name} photo={s.photo} className={styles.portraitImage} /><div><strong>{s.name}</strong><span>{s.role}</span></div></Link>)}</div>
    </section>
    <section id="specialists" className={styles.cream} aria-label="Каталог специалистов"><div className={`${styles.container} ${styles.grid}`}>
      {specialists.map((s,i)=><SpecialistCard key={s.slug} specialist={s} featured={i===0} />)}
      <article className={styles.recruit}><div className={styles.recruitImage} aria-hidden="true">?</div><div><h3>Возможно<br/>это ваше место?</h3><span className={styles.tag}>Расстановщик</span><p>Если вы практикующий специалист и хотите стать частью команды ИЖСИЗ, расскажите нам о себе.</p><a href="#join" className={styles.outline}>Оставить заявку ↗</a></div></article>
    </div></section>
    <section id="selection" className={`${styles.container} ${styles.selection}`}><div><p className={styles.eyebrow}>Поможем сориентироваться</p><h2>Не знаете, к кому обратиться?</h2><p className={styles.intro}>Кратко опишите ситуацию — координатор поможет подобрать подходящего специалиста и формат работы.</p><div className={styles.connections} aria-hidden="true"><span>◉</span><i/><span>◉</span><i/><span>◉</span></div></div><SpecialistLeadForm /></section>
    <section className={styles.cream}><div className={`${styles.container} ${styles.selection}`}><div><p className={styles.eyebrow}>Форматы работы</p><h2>Сначала хотите выбрать формат помощи?</h2><p>Если вы пока не знаете, какой специалист вам подойдёт, можно начать с раздела «Психологическая помощь».</p><Link href="/psychological-help" className={styles.outline}>Все форматы психологической помощи ↗</Link></div><nav className={styles.formatLinks} aria-label="Форматы помощи"><Link href="/individual-consultations">Индивидуальные консультации ↗</Link><Link href="/individual-consultations#methods">Индивидуальные расстановки ↗</Link><Link href="/rasstanovochnye-gruppy">Расстановочные группы ↗</Link><Link href="/telese-terapiya">Телесно-ориентированная терапия ↗</Link></nav></div></section>
    <section id="join" className={`${styles.container} ${styles.selection}`}><div><p className={styles.eyebrow}>Команда ИЖСИЗ</p><h2>Расскажите нам о себе</h2><p className={styles.intro}>Оставьте контакты и информацию о вашей практике — мы свяжемся с вами.</p></div><SpecialistLeadForm recruitment /></section>
  </div>;
}
