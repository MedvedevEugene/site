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
    <div className="testimonial-card testimonial-card--hero">
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
      <div className="mt-auto pt-4">
        <div className="font-semibold text-[14px] text-[#272344] leading-[1.55]">
          {HERO_TESTIMONIAL.author}
        </div>
        <div className="text-[11px] text-[#272344] leading-[1.55] mt-0.5">{HERO_TESTIMONIAL.role}</div>
      </div>
    </div>
  );
}

export function HeroSection({ heroPortrait }: HeroSectionProps) {
  const portrait = resolvePortrait(heroPortrait);

  return (
    <section className="hero-tilda overflow-hidden">
      <div className="container-site">
        <div className="hero-tilda__stage">
          <div className="hero-tilda__glow" aria-hidden />
          <div className="hero-tilda__content">
            <h1 className="hero-tilda__title">
              Найди опору, ясность и новый вектор жизни в&nbsp;ИЖСИЗ
            </h1>
            <p className="hero-tilda__subtitle">
              Обучение и расстановки, которые помогают обрести устойчивость в жизни, отношениях и бизнесе
            </p>
            <div className="hero-tilda__tags">
              {HERO_TAG_ROWS.map((row) => (
                <div key={row.join("-")} className="hero-tilda__tag-row">
                  {row.map((tag) => (
                    <span key={tag} className="hero-tilda__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <Link href="/catalog" className="hero-tilda__cta">
              <SafeImage
                src={IMAGES.logoCircle}
                alt=""
                width={19}
                height={19}
                className="w-[19px] h-[19px] shrink-0"
              />
              Подобрать программу
            </Link>
          </div>

          <Image
            src={portrait}
            alt=""
            width={584}
            height={515}
            priority
            sizes="(max-width: 1023px) 85vw, 584px"
            className="hero-tilda__portrait"
          />

          <div className="hero-tilda__quote">
            <HeroTestimonialCard />
          </div>
        </div>
      </div>
    </section>
  );
}
