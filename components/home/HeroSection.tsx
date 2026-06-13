import Link from "next/link";
import Image from "next/image";
import { SafeImage } from "@/components/ui/SafeImage";
import { HERO_TESTIMONIAL } from "@/lib/constants";
import { HERO_TAG_ROWS, IMAGES } from "@/lib/site-data";

type HeroSectionProps = {
  heroPortrait?: string;
};

const HERO_PORTRAIT_MARK = "01b0e4cc";

/** В админке иногда сохраняли облако/шапку вместо портрета — подставляем правильный URL. */
function resolvePortrait(url?: string) {
  if (url?.includes(HERO_PORTRAIT_MARK)) return url;
  return IMAGES.heroPortrait;
}

function HeroTestimonialCard() {
  return (
    <div className="testimonial-card testimonial-card--hero shadow-[0_12px_40px_rgba(39,35,68,0.1)]">
      <SafeImage
        src={IMAGES.quoteIcon}
        alt=""
        width={16}
        height={16}
        className="w-4 h-4 mb-3 shrink-0"
      />
      <p className="text-[12px] leading-[1.55] m-0 text-[#272344]">
        &ldquo;{HERO_TESTIMONIAL.quote}&rdquo;
      </p>
      <div className="mt-4">
        <div className="font-semibold text-[14px] text-[#272344] leading-tight">
          {HERO_TESTIMONIAL.author}
        </div>
        <div className="text-[11px] text-[#272344]/80 mt-0.5">{HERO_TESTIMONIAL.role}</div>
      </div>
    </div>
  );
}

export function HeroSection({ heroPortrait }: HeroSectionProps) {
  const portrait = resolvePortrait(heroPortrait);

  return (
    <section className="py-8 md:py-10 lg:py-12 bg-white overflow-hidden">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          <div className="z-10 lg:col-span-3 max-w-[480px]">
            <h1 className="font-heading text-[clamp(28px,4vw,44px)] font-medium leading-[1.15] m-0 mb-5 text-primary">
              Найди опору, ясность и новый вектор жизни в&nbsp;ИЖСИЗ
            </h1>
            <p className="text-lg text-muted m-0 mb-6 leading-relaxed">
              Обучение и расстановки, которые помогают обрести устойчивость в жизни, отношениях и бизнесе
            </p>
            <div className="flex flex-col gap-2.5 mb-8">
              {HERO_TAG_ROWS.map((row) => (
                <div key={row.join("-")} className="flex flex-wrap gap-2.5">
                  {row.map((tag) => (
                    <span key={tag} className="tag-white">
                      {tag}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <Link href="/catalog" className="btn btn-primary-solid inline-flex">
              <SafeImage
                src={IMAGES.logoCircle}
                alt=""
                width={22}
                height={22}
                className="w-[22px] h-[22px]"
              />
              Подобрать программу
            </Link>
          </div>

          {/* Портрет и цитата — отдельные колонки, размеры как на lifeinstitute.ru */}
          <div className="lg:col-span-9 lg:grid lg:grid-cols-[minmax(0,1fr)_259px] lg:gap-3 xl:gap-5 items-start min-h-[400px] sm:min-h-[480px] lg:min-h-[620px]">
            <div className="relative flex items-end justify-start self-end min-h-[360px] sm:min-h-[440px] lg:min-h-[620px] overflow-visible">
              <Image
                src={portrait}
                alt=""
                width={584}
                height={515}
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="w-[min(135%,860px)] max-w-none max-h-[640px] h-auto object-contain object-left-bottom pointer-events-none select-none lg:-ml-6 xl:-ml-12 2xl:-ml-16"
              />
            </div>
            <div className="hidden lg:block self-start pt-6 xl:pt-8 shrink-0">
              <HeroTestimonialCard />
            </div>
          </div>
          <div className="lg:hidden max-w-[259px] mx-auto sm:mx-0 -mt-2">
            <HeroTestimonialCard />
          </div>
        </div>
      </div>
    </section>
  );
}
