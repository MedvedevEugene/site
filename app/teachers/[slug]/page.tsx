import Link from "next/link";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/components/ui/PageShell";
import { getSpecialistDisplayRecords } from "@/lib/content";
import { getDefaultSpecialist } from "@/lib/specialists-data";
import { resolveSpecialist } from "@/lib/specialists-display";
import { SpecialistPhoto } from "@/components/specialists/SpecialistPhoto";
import { SpecialistLeadForm } from "@/components/specialists/SpecialistLeadForm";
import styles from "./profile.module.css";
async function profile(slug: string) {
 const records = await getSpecialistDisplayRecords();
 const record = records.find(s => s.slug === slug);
 if (record?.published === false) return null;
 return record ? resolveSpecialist(record) : getDefaultSpecialist(slug);
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
 const teacher = await profile((await params).slug);
 return createPageMetadata(teacher?.name || "Специалист");
}
export default async function TeacherPage({ params }: { params: Promise<{ slug: string }> }) {
 const teacher = await profile((await params).slug);
 if (!teacher) notFound();
 return <>
  <section className={styles.hero}><div className={styles.container}>
   <nav className={styles.breadcrumbs} aria-label="Хлебные крошки"><Link href="/">Главная</Link> · <Link href="/specialists">Специалисты</Link> · {teacher.name}</nav>
   <div className={styles.intro}><div className={styles.photo}><SpecialistPhoto name={teacher.name} photo={teacher.photo} /></div><div>
    <h1>{teacher.name}</h1><div className={styles.tags}>{teacher.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
    <p>{teacher.summary}</p><div className={styles.actions}><Link className={styles.primary} href="#contact">Записаться к специалисту</Link><Link className={styles.outline} href="#services">С чем работает</Link></div>
   </div></div>
  </div></section>
  <section className={styles.container}><div className={styles.details}><div id="services"><h2>Работает с темами</h2><ul>{teacher.services.map(service=><li key={service}>{service}</li>)}</ul></div><div><h2>О специалисте</h2><p>{teacher.bio}</p></div></div></section>
  <section className={styles.cream}><div className={styles.container}><h2>Форматы работы</h2><div className={styles.format}><span>Индивидуальная консультация</span><Link href="#contact">Записаться →</Link></div><div className={styles.format}><span>Индивидуальная расстановка</span><Link href="/individual-consultations#methods">Подробнее →</Link></div><div className={styles.format}><span>Расстановочная группа</span><Link href="/rasstanovochnye-gruppy">Ближайшие даты →</Link></div></div></section>
  <section className={styles.booking} id="contact"><SpecialistLeadForm specialist={teacher.name}/><Link href="/specialists#selection">Помочь выбрать специалиста →</Link></section>
 </>;
}
