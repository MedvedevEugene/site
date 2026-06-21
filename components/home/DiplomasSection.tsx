import Image from "next/image";
import { SITE } from "@/lib/constants";
import { IMAGES } from "@/lib/site-data";

type DiplomasSectionProps = {
  diplomaUrl?: string;
};

export function DiplomasSection({ diplomaUrl = IMAGES.diploma }: DiplomasSectionProps) {
  return (
    <section className="diploma-section">
      <div className="container-site diploma-section__grid">
        <div className="diploma-section__copy">
          <h2 className="diploma-section__title">
            Выдаём дипломы
            <br />
            и сертификаты
          </h2>
          <div className="diploma-section__text">
            <p>
              После окончания обучения вы получите диплом о профессиональной переподготовке или сертификат
              установленного образца – в зависимости от выбранной программы.
            </p>
            <p>
              Мы ведём обучение по государственной лицензии № {SITE.license}, что подтверждает официальность
              и качество подготовки в Институте Расстановки Жизни.
            </p>
          </div>
        </div>

        <div className="diploma-section__media">
          <Image src={IMAGES.diplomaBg} alt="" fill className="object-cover object-center" sizes="660px" />
          <Image
            src={diplomaUrl}
            alt="Диплом"
            width={352}
            height={246}
            className="diploma-section__diploma"
            sizes="352px"
          />
          <Image
            src={IMAGES.certificate}
            alt="Сертификат"
            width={335}
            height={238}
            className="diploma-section__certificate"
            sizes="335px"
          />
        </div>
      </div>
    </section>
  );
}
