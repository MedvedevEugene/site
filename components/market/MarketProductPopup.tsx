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
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!product) {
      setVisible(false);
      setClosing(false);
      return;
    }

    setQuantity(1);
    setClosing(false);
    const frame = window.requestAnimationFrame(() => setVisible(true));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [product]);

  function handleClose() {
    if (closing) return;
    setClosing(true);
    setVisible(false);
    window.setTimeout(() => {
      onClose();
      setClosing(false);
    }, 320);
  }

  if (!product) return null;

  function decreaseQuantity() {
    setQuantity((value) => Math.max(1, value - 1));
  }

  function increaseQuantity() {
    setQuantity((value) => value + 1);
  }

  return (
    <div
      className={`market-popup${visible ? " market-popup--visible" : ""}${closing ? " market-popup--closing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={product.title}
    >
      <button type="button" className="market-popup__overlay" aria-label="Закрыть" onClick={handleClose} />

      <div className="market-popup__panel">
        <button type="button" className="market-popup__back" onClick={handleClose}>
          ← Назад
        </button>

        <div className="market-popup__layout">
          <div
            className="market-popup__media"
            role="img"
            aria-label={product.title}
            style={{ backgroundImage: `url("${product.image}")` }}
          />

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
