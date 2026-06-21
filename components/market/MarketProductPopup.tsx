"use client";

import { useEffect, useState } from "react";
import type { MarketProduct } from "@/lib/market-data";

interface MarketProductPopupProps {
  product: MarketProduct | null;
  onClose: () => void;
}

function formatPrice(value: number) {
  return `${value} р.`;
}

export function MarketProductPopup({ product, onClose }: MarketProductPopupProps) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product) return;
    setQuantity(1);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  function decreaseQuantity() {
    setQuantity((value) => Math.max(1, value - 1));
  }

  function increaseQuantity() {
    setQuantity((value) => value + 1);
  }

  return (
    <div className="market-popup" role="dialog" aria-modal="true" aria-label={product.title}>
      <button type="button" className="market-popup__overlay" aria-label="Закрыть" onClick={onClose} />

      <div className="market-popup__panel">
        <button type="button" className="market-popup__back" onClick={onClose}>
          ← Назад
        </button>

        <div className="market-popup__layout">
          <div className="market-popup__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.image} alt="" className="market-popup__image" />
          </div>

          <div className="market-popup__content">
            <h2 className="market-popup__title">{product.title}</h2>

            <div className="market-popup__prices">
              <span className="market-popup__price">{formatPrice(product.price)}</span>
              {product.oldPrice ? (
                <span className="market-popup__price-old">{formatPrice(product.oldPrice)}</span>
              ) : null}
            </div>

            <div className="market-popup__actions">
              <div className="market-popup__quantity">
                <button type="button" className="market-popup__quantity-btn" onClick={decreaseQuantity} aria-label="Уменьшить количество">
                  −
                </button>
                <span className="market-popup__quantity-value">{quantity}</span>
                <button type="button" className="market-popup__quantity-btn" onClick={increaseQuantity} aria-label="Увеличить количество">
                  +
                </button>
              </div>

              <button type="button" className="market-popup__cart" disabled>
                В корзину
              </button>
            </div>

            <p className="market-popup__description">{product.detailDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
