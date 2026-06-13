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
            <p className="text-muted m-0 mb-4 leading-relaxed">
              После окончания обучения вы получите диплом о профессиональной переподготовке или сертификат
              установленного образца – в зависимости от выбранной программы.
            </p>
            <p className="text-muted m-0 leading-relaxed">
              Мы ведём обучение по государственной лицензии № {SITE.license}, что подтверждает официальность
              и качество подготовки в Институте Расстановки Жизни.
            </p>
          </div>
          <div className="relative min-h-[280px] lg:min-h-[320px]">
            <Image
              src={diplomaUrl}
              alt="Диплом"
              width={352}
              height={246}
              className="w-full max-w-[352px] ml-auto h-auto object-contain"
              sizes="352px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
