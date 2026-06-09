import Image from "next/image";
import { FEATURE_PILLARS } from "@/lib/site-data";

export function FeaturePillars() {
  return (
    <section className="section bg-white">
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURE_PILLARS.map((item) => (
            <div
              key={item.title}
              className={`rounded-[28px] p-8 min-h-[320px] flex flex-col items-center text-center ${
                item.tint === "blue" ? "bg-[#eef2fb]" : "bg-cream-pill"
              }`}
            >
              <div className="relative w-[140px] h-[140px] mb-8">
                <Image src={item.image} alt="" fill className="object-contain" sizes="140px" />
              </div>
              <p className="font-heading text-lg font-medium m-0 leading-snug">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
