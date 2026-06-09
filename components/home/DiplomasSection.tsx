import Image from "next/image";
import { SITE } from "@/lib/constants";
import { IMAGES } from "@/lib/site-data";

export function DiplomasSection() {
  return (
    <section className="section bg-white">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-heading text-[clamp(24px,3vw,36px)] font-medium m-0 mb-5">Выдаём дипломы и сертификаты</h2>
            <p className="text-muted m-0 mb-4 leading-relaxed">
              После окончания обучения вы получите диплом о профессиональной переподготовке или сертификат
              установленного образца – в зависимости от выбранной программы.
            </p>
            <p className="text-muted m-0 leading-relaxed">
              Мы ведём обучение по государственной лицензии № {SITE.license}, что подтверждает официальность
              и качество подготовки в Институте Расстановки Жизни.
            </p>
          </div>
          <div className="relative rounded-[40px] overflow-hidden min-h-[360px] bg-gradient-to-tr from-[#c5b4e3] to-[#fff5e6] p-8">
            <Image
              src={IMAGES.diploma}
              alt="Диплом"
              fill
              className="object-contain opacity-40 p-6"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute bottom-6 right-6 w-[55%] max-w-[280px] aspect-[3/4] shadow-2xl rounded-lg overflow-hidden">
              <Image src={IMAGES.certificate} alt="Сертификат" fill className="object-cover" sizes="280px" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
