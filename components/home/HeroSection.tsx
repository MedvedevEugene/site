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

export function HeroSection({ heroPortrait }: HeroSectionProps) {
  const portrait = resolvePortrait(heroPortrait);

  return (
    <section className="py-8 md:py-10 lg:py-12 bg-cream-bg/40 overflow-hidden">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 xl:gap-10 items-center">
          {/* Левая колонка — как на Tilda */}
          <div className="z-10 max-w-[560px]">
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

          {/* Правая колонка — портрет + одна цитата */}
          <div className="relative min-h-[380px] sm:min-h-[440px] lg:min-h-[520px] xl:min-h-[560px]">
            <Image
              src={portrait}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain object-bottom object-right lg:object-center pointer-events-none select-none"
            />
            <div className="absolute right-0 top-[42%] -translate-y-1/2 z-10 w-[min(100%,340px)] hidden sm:block">
              <div className="testimonial-card shadow-[0_12px_40px_rgba(59,55,88,0.12)]">
                <SafeImage
                  src={IMAGES.quoteIcon}
                  alt=""
                  width={32}
                  height={32}
                  className="w-8 h-8 mb-4"
                />
                <p className="text-[15px] leading-relaxed m-0 mb-4 text-primary">
                  &ldquo;{HERO_TESTIMONIAL.quote}&rdquo;
                </p>
                <div className="font-semibold text-sm text-primary">{HERO_TESTIMONIAL.author}</div>
                <div className="text-xs text-muted mt-0.5">{HERO_TESTIMONIAL.role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
