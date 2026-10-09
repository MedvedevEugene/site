"use client";
import { useEffect, useRef, useState } from "react";
import type { SpecialistProfile } from "@/lib/specialists-data";
import { SpecialistCard } from "@/components/specialists/SpecialistCard";
import styles from "./IcSpecialistsCarousel.module.css";
export function IcSpecialistsCarousel({ specialists }: { specialists: readonly SpecialistProfile[] }) {
  const track=useRef<HTMLDivElement>(null);
  const [position,setPosition]=useState({start:true,end:false});
  function updatePosition() { const el=track.current; if(el) setPosition({start:el.scrollLeft<2,end:el.scrollLeft+el.clientWidth>=el.scrollWidth-2}); }
  useEffect(() => { const el=track.current; if(!el) return; const observer=new ResizeObserver(updatePosition); observer.observe(el); updatePosition(); return ()=>observer.disconnect(); }, [specialists.length]);
  function scroll(direction:number) { const el=track.current; const card=el?.firstElementChild as HTMLElement | null; if(el && card) el.scrollBy({left:direction*(card.offsetWidth+32),behavior:"smooth"}); }
  return <div className={styles.carousel}>
    <div className={styles.track} ref={track} onScroll={updatePosition}>
      {specialists.map((s,i)=><SpecialistCard specialist={s} key={s.slug} featured={i===0} className={styles.item} />)}
    </div>
    {specialists.length>1 && <div className={styles.controls}><button type="button" onClick={()=>scroll(-1)} disabled={position.start} aria-label="Предыдущие специалисты">‹</button><button type="button" onClick={()=>scroll(1)} disabled={position.end} aria-label="Следующие специалисты">›</button></div>}
  </div>;
}
