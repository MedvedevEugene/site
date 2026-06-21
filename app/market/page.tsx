import type { Metadata } from "next";
import { MarketPageSection } from "@/components/market/MarketPageSection";

export const metadata: Metadata = {
  title: "Маркет развивающих товаров",
};

export default function MarketPage() {
  return <MarketPageSection />;
};
