import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/site-data";

export function PathSection() {
  return (
    <section className="path-section">
      <div className="path-section__stage">
        <Image
          src={IMAGES.pathCloud}
          alt=""
          width={249}
          height={249}
          className="path-section__cloud"
          priority
        />
        <Image
          src={IMAGES.pathGradCap}
          alt=""
          width={219}
          height={219}
          className="path-section__cap"
          priority
        />

        <div className="path-section__content">
          <h2 className="path-section__title">Ваш путь в ИРЖ</h2>
          <p className="path-section__subtitle">
            Кто-то приходит за&nbsp;поддержкой, кто-то&nbsp;– за&nbsp;профессией. Выберите своё направление.
          </p>
          <Link href="#catalog" className="path-section__btn">
            Выбрать свой путь
          </Link>
        </div>
      </div>
      <div className="path-section__curve" />
    </section>
  );
}
