import Link from "next/link";
import { AI_TOOLS } from "@/lib/ai-tools-data";

type AiToolsSectionProps = {
  variant?: "default" | "ic";
  id?: string;
};

export function AiToolsSection({ variant = "default", id = "ai-tools" }: AiToolsSectionProps) {
  const isIc = variant === "ic";

  return (
    <section className={isIc ? "ic-page__section" : "section"} id={id}>
      <div className="container-site">
        <h2 className={isIc ? "ic-page__title" : "section-title"}>Цифровые НЛП/НЛУ-инструменты</h2>
        <p className={isIc ? "ic-page__subtitle" : "section-subtitle"}>
          Самостоятельное исследование → карта ответов → бесплатный ИИ-разбор
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AI_TOOLS.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-[20px] border-2 border-primary p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#774bd9] to-primary" />
              <span className="inline-block bg-cream rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide mb-4">
                {tool.badge}
              </span>
              <h3 className="font-heading text-lg font-medium m-0 mb-2.5">{tool.title}</h3>
              <p className="text-muted text-[15px] m-0 mb-5">{tool.description}</p>
              <div className="flex flex-col gap-2.5">
                {isIc ? (
                  <>
                    <Link
                      href={tool.href}
                      className="ic-page__btn ic-page__btn--primary ic-page__btn--sm w-full"
                    >
                      Пройти {tool.title}
                    </Link>
                    <Link
                      href={tool.href}
                      className="ic-page__btn ic-page__btn--outline-dark ic-page__btn--sm w-full"
                    >
                      Подробнее об инструменте
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href={tool.href} className="btn btn-primary">
                      Пройти {tool.title}
                    </Link>
                    <Link href={tool.href} className="btn btn-outline">
                      Подробнее об инструменте
                    </Link>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
