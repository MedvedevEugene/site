import Image from "next/image";
import { SITE } from "@/lib/constants";
import { IMAGES } from "@/lib/site-data";

type DiplomasSectionProps = {
  diplomaUrl?: string;
};

export function DiplomasSection({ diplomaUrl = IMAGES.diploma }: DiplomasSectionProps) {
  return (
    <section className="section bg-white">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-body text-[clamp(24px,3vw,36px)] font-semibold m-0 mb-5 text-primary">
              Выдаём дипломы и сертификаты
            </h2>
            <p className="text-muted text-lg m-0 mb-4 leading-relaxed">
              После окончания обучения вы получите диплом о профессиональной переподготовке или сертификат
              установленного образца – в зависимости от выбранной программы.
            </p>
            <p className="text-muted text-lg m-0 leading-relaxed">
              Мы ведём обучение по государственной лицензии № {SITE.license}, что подтверждает официальность
              и качество подготовки в Институте Расстановки Жизни.
            </p>
          </div>
          <div className="relative min-h-[300px] sm:min-h-[360px] lg:min-h-[400px]">
            <Image
              src={IMAGES.diplomaBg}
              alt=""
              fill
              className="object-contain object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <Image
              src={diplomaUrl}
              alt="Диплом"
              width={352}
              height={246}
              className="absolute left-[6%] top-[12%] w-[min(54%,352px)] h-auto object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
              sizes="352px"
            />
            <Image
              src={IMAGES.certificate}
              alt="Сертификат"
              width={335}
              height={238}
              className="absolute right-[2%] bottom-[6%] w-[min(50%,335px)] h-auto object-contain drop-shadow-[0_12px_32px_rgba(0,0,0,0.2)]"
              sizes="335px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
