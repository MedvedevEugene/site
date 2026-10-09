import Link from "next/link";
import { SpecialistPhoto } from "./SpecialistPhoto";
import type { SpecialistProfile } from "@/lib/specialists-data";
import styles from "./SpecialistCard.module.css";
export type SpecialistCardData = SpecialistProfile;
export function SpecialistCard({ specialist, className = "", featured = false }: { specialist: SpecialistProfile; className?: string; featured?: boolean }) {
  return <article className={`${styles.card} ${className}`}>
    <div className={styles.photo}><SpecialistPhoto name={specialist.name} photo={specialist.photo} className={styles.image} /></div>
    <div className={styles.body}>
      <h3>{specialist.name}</h3>
      <ul className={styles.tags} aria-label="Направления работы">{specialist.tags.map(tag=><li key={tag}>{tag}</li>)}</ul>
      <p>{specialist.summary}</p>
      <Link href={`/teachers/${specialist.slug}`} className={`${styles.link} ${featured ? styles.featured : ""}`}>О специалисте <span aria-hidden="true">↗</span></Link>
    </div>
  </article>;
}
