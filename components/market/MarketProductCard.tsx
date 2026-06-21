"use client";

import type { MarketProduct } from "@/lib/market-data";

interface MarketProductCardProps {
  product: MarketProduct;
  onDetails: (product: MarketProduct) => void;
}

function formatPrice(value: number) {
  return `${value} р.`;
}

export function MarketProductCard({ product, onDetails }: MarketProductCardProps) {
  return (
    <article className="market-card">
      <div className="market-card__media">
        {product.onSale ? <span className="market-card__sale">SALE</span> : null}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt="" className="market-card__image" />
      </div>

      <div className="market-card__body">
        <h3 className="market-card__title">{product.title}</h3>
        <p className="market-card__description">{product.shortDescription}</p>

        <div className="market-card__prices">
          <span className="market-card__price">{formatPrice(product.price)}</span>
          {product.oldPrice ? <span className="market-card__price-old">{formatPrice(product.oldPrice)}</span> : null}
        </div>

        <div className="market-card__actions">
          <button type="button" className="market-card__btn market-card__btn--details" onClick={() => onDetails(product)}>
            Подробнее
          </button>
          {product.showCartButton ? (
            <button type="button" className="market-card__btn market-card__btn--cart" disabled>
              В корзину
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
