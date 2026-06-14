import Image from "next/image";
import { HeroProgramCta } from "@/components/home/HeroProgramCta";
import { HERO_TESTIMONIAL } from "@/lib/constants";
import { HERO_TAG_ROWS, IMAGES } from "@/lib/site-data";

type HeroSectionProps = {
  heroPortrait?: string;
};

const HERO_PORTRAIT_MARK = "01b0e4cc";

function resolvePortrait(url?: string) {
  if (url?.includes(HERO_PORTRAIT_MARK)) return url;
  return IMAGES.heroPortrait;
}

function HeroQuoteMark() {
  return (
    <svg
      className="testimonial-card__quote-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M16 8C16 6.41775 15.5308 4.87103 14.6518 3.55544C13.7727 2.23984 12.5233 1.21446 11.0615 0.608964C9.59966 0.00346267 7.99113 -0.154964 6.43928 0.153718C4.88743 0.4624 3.46197 1.22433 2.34315 2.34315C1.22433 3.46197 0.4624 4.88743 0.153718 6.43928C-0.154964 7.99113 0.00346269 9.59966 0.608964 11.0615C1.21446 12.5233 2.23984 13.7727 3.55544 14.6518C4.87103 15.5308 6.41775 16 8 16L8 8H16Z"
        fill="#272344"
      />
    </svg>
  );
}

function HeroTestimonialCard() {
  return (
    <div className="testimonial-card testimonial-card--hero">
      <div className="testimonial-card__quote-marks" aria-hidden>
        <HeroQuoteMark />
        <HeroQuoteMark />
      </div>
      <p className="testimonial-card__quote-text">{HERO_TESTIMONIAL.quote}</p>
      <div className="mt-auto pt-3">
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
    <section className="hero-tilda">
      <div className="hero-tilda__band">
        <div className="container-site">
          <div className="hero-tilda__stage">
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
              <HeroProgramCta />
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
      </div>
    </section>
  );
}
