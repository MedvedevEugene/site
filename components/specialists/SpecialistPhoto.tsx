import Image from "next/image";
export function SpecialistPhoto({ name, photo, className = "", priority = false }: { name: string; photo: string | null; className?: string; priority?: boolean }) {
  return photo ? <Image src={photo} alt={name} fill className={className} sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px" priority={priority} draggable={false} /> : <div className={className} role="img" aria-label={name} style={{display:"grid",placeItems:"center",background:"#e8e1f4",color:"#7145cb",fontSize:"56px",height:"100%"}}>{name.split(" ").map(n=>n[0]).slice(0,2).join("")}</div>;
}
