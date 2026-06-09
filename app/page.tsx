import Link from "next/link";
import Image from "next/image";
import { TestimonialSlider } from "@/components/ui/TestimonialSlider";
import { HERO_TAGS, PROGRAMS } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <section className="py-10 md:py-[60px]">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-medium leading-tight m-0 mb-5">
                Найди опору, ясность и новый вектор жизни в&nbsp;ИЖСИЗ
              </h1>
              <p className="text-lg text-muted m-0 mb-7 max-w-[520px]">
                Обучение и расстановки, которые помогают обрести устойчивость в жизни, отношениях и бизнесе
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <Link href="/catalog" className="btn btn-primary">Подобрать программу</Link>
                <Link href="/psychological-help" className="btn btn-outline">Пройти онлайн-инструмент</Link>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {HERO_TAGS.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className="relative rounded-[20px] overflow-hidden aspect-[4/3] bg-cream-bg">
              <Image
                src="https://static.tildacdn.com/tild6439-3761-4838-b130-303234303536/2d6688fa-356a-47ed-9.png"
                alt=""
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <TestimonialSlider />
        </div>
      </section>

      <section className="section-cream">
        <div className="container-site">
          <h2 className="section-title">Каталог наших программ</h2>
          <p className="section-subtitle">
            Образование, консультации, группы и цифровые инструменты — всё в одном месте
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROGRAMS.map((p) => (
              <Link key={p.href} href={p.href} className="card flex gap-5 items-start hover:border-primary">
                <Image src={p.icon} alt="" width={80} height={80} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                <div>
                  <div className="text-[13px] text-muted mb-1">{p.meta}</div>
                  <h3 className="font-heading text-base font-medium m-0">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <h2 className="section-title">Что вам откликается сейчас?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="card">
              <div className="text-2xl mb-4">🎓</div>
              <h3 className="font-heading text-lg font-medium m-0 mb-2.5">Стать расстановщиком</h3>
              <p className="text-muted text-[15px] m-0 mb-5">Профессиональное обучение с практикой с первых дней.</p>
              <Link href="/base-cource" className="btn btn-outline">Подробнее</Link>
            </div>
            <div className="card">
              <div className="text-2xl mb-4">💬</div>
              <h3 className="font-heading text-lg font-medium m-0 mb-2.5">Личная терапия</h3>
              <p className="text-muted text-[15px] m-0 mb-5">Индивидуальные консультации онлайн — бережный формат.</p>
              <Link href="/individual-consultations" className="btn btn-outline">Записаться</Link>
            </div>
            <div className="card card-accent">
              <div className="text-2xl mb-4">✨</div>
              <h3 className="font-heading text-lg font-medium m-0 mb-2.5">Онлайн-инструменты</h3>
              <p className="text-white/85 text-[15px] m-0 mb-5">16 ассоциаций, НЛУ и Инсайтограф — исследуйте запрос самостоятельно.</p>
              <Link href="/psychological-help" className="btn btn-outline border-white/50 text-white hover:bg-white/10">Попробовать</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-cream">
        <div className="container-site">
          <h2 className="section-title">Как это выглядит на деле</h2>
          <p className="section-subtitle">Короткие отрывки из живых расстановок и групп</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {["Очный формат", "Онлайн практика", "Онлайн лекция"].map((label) => (
              <div key={label} className="card text-center p-8">
                <h3 className="font-heading text-base font-medium m-0">{label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site text-center">
          <h2 className="section-title">Выдаём дипломы и сертификаты</h2>
          <p className="section-subtitle max-w-[720px]">
            После окончания обучения вы получите диплом о профессиональной переподготовке или сертификат
            установленного образца. Мы ведём обучение по государственной лицензии № Л035-01298-77/03208353.
          </p>
        </div>
      </section>
    </>
  );
}
