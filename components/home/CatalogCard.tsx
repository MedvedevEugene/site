"use client";

import Link from "next/link";
import { useCallbackPopup } from "@/components/layout/CallbackPopupContext";
import type { CatalogDecor } from "@/lib/site-data";
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
  decor?: CatalogDecor;
  tag: string;
  badge?: string;
  title: string;
  meta: string;
  callbackVariant?: CallbackPopupVariantId;
};

function CatalogLightningIcon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/catalog/badge-bolt.svg"
      alt=""
      width={13}
      height={25}
      className="catalog-card__badge-icon"
      aria-hidden
    />
  );
}

function CatalogArrow() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/catalog/arrow.svg"
      alt=""
      width={28}
      height={28}
      className="catalog-card__arrow"
      aria-hidden
    />
  );
}

function CatalogDecorLayer({ decor }: { decor?: CatalogDecor }) {
  if (!decor) return null;

  if (decor === "base") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/catalog/decor-base.svg"
        alt=""
        className="catalog-card__decor catalog-card__decor--base"
        aria-hidden
      />
    );
  }

  if (decor === "business") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/catalog/decor-business.svg"
        alt=""
        className="catalog-card__decor catalog-card__decor--business"
        aria-hidden
      />
    );
  }

  if (decor === "body") {
    return (
      <div className="catalog-card__decor catalog-card__decor--body" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/catalog/decor-body-3.svg" alt="" className="catalog-card__decor-layer catalog-card__decor-layer--body-outer" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/catalog/decor-body-1.svg" alt="" className="catalog-card__decor-layer catalog-card__decor-layer--body-mid" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/catalog/decor-body-2.svg" alt="" className="catalog-card__decor-layer catalog-card__decor-layer--body-inner" />
      </div>
    );
  }

  if (decor === "consult") {
    return (
      <div className="catalog-card__decor catalog-card__decor--consult" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/catalog/decor-consult-3.svg" alt="" className="catalog-card__decor-layer catalog-card__decor-layer--consult-outer" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/catalog/decor-consult-2.svg" alt="" className="catalog-card__decor-layer catalog-card__decor-layer--consult-mid" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/catalog/decor-consult-1.svg" alt="" className="catalog-card__decor-layer catalog-card__decor-layer--consult-inner" />
      </div>
    );
  }

  if (decor === "groups") {
    return (
      <div className="catalog-card__decor catalog-card__decor--groups" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/catalog/decor-groups-1.svg" alt="" className="catalog-card__decor-layer catalog-card__decor-layer--groups-a" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/catalog/decor-groups-2.svg" alt="" className="catalog-card__decor-layer catalog-card__decor-layer--groups-b" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/catalog/decor-groups-3.svg" alt="" className="catalog-card__decor-layer catalog-card__decor-layer--groups-c" />
      </div>
    );
  }

  if (decor === "market") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/catalog/decor-market.svg"
        alt=""
        className="catalog-card__decor catalog-card__decor--market"
        aria-hidden
      />
    );
  }

  return null;
}

function CatalogCardContent({
  featured,
  badge,
  tag,
  title,
  meta,
  decor,
}: Pick<CatalogCardProps, "featured" | "badge" | "tag" | "title" | "meta" | "decor">) {
  return (
    <>
      <CatalogDecorLayer decor={decor} />
      {featured && badge && (
        <div className="catalog-card__badge">
          <CatalogLightningIcon />
          <span>{badge}</span>
        </div>
      )}
      <div className="catalog-card__tag">{tag}</div>
      <div className="catalog-card__body">
        <h3 className="catalog-card__title">{title}</h3>
      </div>
      <div className="catalog-card__footer">
        <div className="catalog-card__meta">{meta}</div>
        <CatalogArrow />
      </div>
    </>
  );
}

export function CatalogCard(props: CatalogCardProps) {
  const { openCallbackPopup } = useCallbackPopup();
  const { href, featured, wide, tone, decor, callbackVariant, badge, tag, title, meta } = props;
  const className = `catalog-card ${TONE_CLASS[tone]} ${wide ? "lg:col-span-2" : ""} group`;

  if (callbackVariant) {
    return (
      <button
        type="button"
        onClick={() => openCallbackPopup(callbackVariant)}
        className={`${className} catalog-card--button`}
      >
        <CatalogCardContent
          featured={featured}
          badge={badge}
          tag={tag}
          title={title}
          meta={meta}
          decor={decor}
        />
      </button>
    );
  }

  return (
    <Link href={href} className={className}>
      <CatalogCardContent
        featured={featured}
        badge={badge}
        tag={tag}
        title={title}
        meta={meta}
        decor={decor}
      />
    </Link>
  );
}
