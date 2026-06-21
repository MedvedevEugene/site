"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallbackPopup } from "@/components/layout/CallbackPopupContext";
import { IMAGES } from "@/lib/site-data";
import type { CallbackPopupVariantId } from "@/lib/callback-popup-variants";

const TONE_CLASS = {
  featured: "catalog-card--featured",
  cream: "catalog-card--cream",
  white: "catalog-card--white",
} as const;

type CatalogCardProps = {
  href: string;
  featured?: boolean;
  wide?: boolean;
  tone: keyof typeof TONE_CLASS;
  tag: string;
  badge?: string;
  title: string;
  meta: string;
  callbackVariant?: CallbackPopupVariantId;
};

function CatalogLightningIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 25" fill="none" aria-hidden className="w-[13px] h-[25px] shrink-0">
      <path d="M0 13.58695L9.88 0L7.8 10.869575H13L2.6 25L4.16 13.58695H0Z" fill="#774BD9" />
    </svg>
  );
}

function CatalogCardContent({
  featured,
  badge,
  tag,
  title,
  meta,
}: Pick<CatalogCardProps, "featured" | "badge" | "tag" | "title" | "meta">) {
  return (
    <>
      {featured && (
        <>
          <Image
            src={IMAGES.spiral}
            alt=""
            width={616}
            height={722}
            className="catalog-card__spiral"
            aria-hidden
          />
          {badge && (
            <div className="catalog-card__badge">
              <CatalogLightningIcon />
              <span>{badge}</span>
            </div>
          )}
        </>
      )}
      <div className="catalog-card__tag">{tag}</div>
      <div className="catalog-card__body">
        <h3 className="catalog-card__title">{title}</h3>
      </div>
      <div className="catalog-card__meta">{meta}</div>
    </>
  );
}

export function CatalogCard(props: CatalogCardProps) {
  const { openCallbackPopup } = useCallbackPopup();
  const { href, featured, wide, tone, callbackVariant, badge, tag, title, meta } = props;
  const className = `catalog-card ${TONE_CLASS[tone]} ${wide ? "lg:col-span-2" : ""} group`;

  if (callbackVariant) {
    return (
      <button
        type="button"
        onClick={() => openCallbackPopup(callbackVariant)}
        className={`${className} catalog-card--button`}
      >
        <CatalogCardContent featured={featured} badge={badge} tag={tag} title={title} meta={meta} />
      </button>
    );
  }

  return (
    <Link href={href} className={className}>
      <CatalogCardContent featured={featured} badge={badge} tag={tag} title={title} meta={meta} />
    </Link>
  );
}
