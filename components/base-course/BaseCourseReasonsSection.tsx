import Image from "next/image";
import { BASE_COURSE_IMAGES, BASE_COURSE_REASONS } from "@/lib/base-course-data";

export function BaseCourseReasonsSection() {
  return (
    <section className="bc-section bc-reasons-section" aria-labelledby="bc-reasons-title">
      <div className="bc-reasons-panel">
        <div className="bc-reasons-panel__canvas">
          <Image
            src={BASE_COURSE_IMAGES.reasonsDiagram}
            alt=""
            width={1200}
            height={1200}
            className="bc-reasons-panel__diagram"
            sizes="(min-width: 960px) 86vw, 100vw"
          />
          <h2 id="bc-reasons-title" className="bc-reasons-panel__title">
            8 причин пойти на&nbsp;курс
          </h2>
          <ol className="bc-reasons-panel__list">
            {BASE_COURSE_REASONS.map((item, index) => (
              <li
                key={item.text}
                className="bc-reasons-panel__item"
                style={{
                  top: `${item.top}%`,
                  left: `${item.left}%`,
                  width: `${item.width}%`,
                }}
              >
                <span className="bc-reasons-panel__num">{index + 1}.</span> {item.text}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
