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
    <div className="testimonial-card shadow-[0_12px_40px_rgba(59,55,88,0.12)]">
      <SafeImage
        src={IMAGES.quoteIcon}
        alt=""
        width={32}
        height={32}
        className="w-8 h-8 mb-4"
      />
      <p className="text-[15px] leading-relaxed m-0 mb-4 text-primary-dark">
        &ldquo;{HERO_TESTIMONIAL.quote}&rdquo;
      </p>
      <div className="font-semibold text-sm text-primary-dark">{HERO_TESTIMONIAL.author}</div>
      <div className="text-[11px] text-primary-dark/80 mt-0.5">{HERO_TESTIMONIAL.role}</div>
    </div>
  );
}

export function HeroSection({ heroPortrait }: HeroSectionProps) {
  const portrait = resolvePortrait(heroPortrait);

  return (
    <section className="py-8 md:py-10 lg:py-12 bg-cream-bg/40 overflow-hidden">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center">
          {/* Левая колонка — как на Tilda */}
          <div className="z-10 lg:col-span-5 max-w-[560px]">
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

          {/* Правая зона — портрет слева, цитата справа (не на лице) */}
          <div className="lg:col-span-7 relative min-h-[360px] sm:min-h-[420px] lg:min-h-[520px]">
            <Image
              src={portrait}
              alt=""
              width={844}
              height={745}
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="absolute left-0 bottom-0 w-[min(100%,560px)] sm:w-[min(88%,520px)] lg:w-[min(78%,560px)] h-auto max-h-[92%] object-contain object-left object-bottom pointer-events-none select-none"
            />
            <div className="hidden lg:block absolute right-0 top-[20%] z-10 w-[260px]">
              <HeroTestimonialCard />
            </div>
          </div>
          <div className="lg:hidden max-w-[340px]">
            <HeroTestimonialCard />
          </div>
        </div>
      </div>
    </section>
  );
}
