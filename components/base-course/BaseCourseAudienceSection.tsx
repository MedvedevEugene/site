import Image from "next/image";
import { BASE_COURSE_AUDIENCE } from "@/lib/base-course-data";

type BaseCourseAudienceSectionProps = {
  onConsultation: () => void;
};

export function BaseCourseAudienceSection({ onConsultation }: BaseCourseAudienceSectionProps) {
  return (
    <section className="bc-section bc-audience-section">
      <div className="bc-audience-section__wrap">
        <h2 className="bc-audience-section__title">Для кого предназначен курс?</h2>

        <div className="bc-audience">
          {BASE_COURSE_AUDIENCE.map((item) => (
            <article
              key={item.title}
              className={`bc-audience__card${item.variant === "dark" ? " bc-audience__card--dark" : ""}`}
            >
              <h3
                className="bc-audience__title"
                style={item.titleWeight ? { fontWeight: item.titleWeight } : undefined}
              >
                {item.title}
              </h3>
              <p className="bc-audience__text">{item.text}</p>
              <Image
                src={item.image}
                alt=""
                width={142}
                height={142}
                className="bc-audience__icon"
              />
            </article>
          ))}
        </div>

        <button type="button" className="bc-btn bc-btn--outline bc-audience__cta" onClick={onConsultation}>
          Получить консультацию
        </button>
      </div>
    </section>
  );
}
