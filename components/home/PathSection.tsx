import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/site-data";

export function PathSection() {
  return (
    <section className="relative pt-16 pb-0 bg-white overflow-hidden">
      <div className="container-site text-center relative z-10 pb-16">
        <div className="absolute left-0 top-0 hidden lg:block">
          <Image src={IMAGES.pathCloud} alt="" width={180} height={140} className="w-[140px] h-auto opacity-90" />
        </div>
        <div className="absolute right-0 bottom-8 hidden lg:block">
          <Image src={IMAGES.pathGradCap} alt="" width={160} height={160} className="w-[130px] h-auto opacity-90" />
        </div>
        <h2 className="font-heading text-[clamp(24px,3vw,36px)] font-medium m-0 mb-4">Ваш путь в ИРЖ</h2>
        <p className="text-muted max-w-[560px] mx-auto m-0 mb-8">
          Кто-то приходит за поддержкой, кто-то – за профессией. Выберите своё направление.
        </p>
        <Link href="#catalog" className="btn btn-primary-solid">Выбрать свой путь</Link>
      </div>
      <div className="h-12 bg-primary-footer curve-top" />
    </section>
  );
}
