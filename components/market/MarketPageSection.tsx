"use client";

import { useState } from "react";
import Link from "next/link";
import { MARKET_PRODUCTS, type MarketProduct } from "@/lib/market-data";
import { MarketProductCard } from "@/components/market/MarketProductCard";
import { MarketProductPopup } from "@/components/market/MarketProductPopup";

export function MarketPageSection() {
  const [activeProduct, setActiveProduct] = useState<MarketProduct | null>(null);

  return (
    <>
      <section className="market-page bg-white">
        <div className="container-site">
          <nav className="market-page__breadcrumbs" aria-label="Хлебные крошки">
            <Link href="/">Главная</Link>
            <span className="market-page__breadcrumbs-sep">/</span>
            <span aria-current="page">Маркет</span>
          </nav>

          <div className="market-page__head">
            <h1 className="market-page__title">Маркет развивающих товаров</h1>
            <p className="market-page__intro">
              Всё для личного роста, практики и вдохновения — от авторов и выпускников ИРЖ.
            </p>
          </div>
        </div>
      </section>

      <section className="market-page__catalog">
        <div className="container-site">
          <div className="market-page__grid">
            {MARKET_PRODUCTS.map((product) => (
              <MarketProductCard key={product.id} product={product} onDetails={setActiveProduct} />
            ))}
          </div>
        </div>
      </section>

      <MarketProductPopup product={activeProduct} onClose={() => setActiveProduct(null)} />
    </>
  );
}
