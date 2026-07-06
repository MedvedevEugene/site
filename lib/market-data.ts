export type MarketProduct = {
  id: string;
  title: string;
  shortDescription: string;
  detailDescription: string;
  price: number;
  oldPrice?: number;
  onSale?: boolean;
  image: string;
  showCartButton?: boolean;
};

export const MARKET_PRODUCTS: MarketProduct[] = [
  {
    id: "dining-chair",
    title: "Dining Chair by esteban+moreno",
    shortDescription:
      "With a new design approach for flexible use: from a dinner for two to a big celebration.",
    detailDescription:
      "Add here some interesting details about the product. Help people realize that this product is exactly what they need. It could be practical and useful information as well: the size of the product, material that it is made of, or care instructions.",
    price: 79,
    oldPrice: 200,
    onSale: true,
    image: "/images/site/tild3032-6163-4564-a163-653733393831__image.png",
    showCartButton: true,
  },
  {
    id: "underwater-watches",
    title: "Underwater wearable watches",
    shortDescription: "An accessory for any occasion, from a nice dinner to an underwater swim.",
    detailDescription:
      "Add here some interesting details about the product. Help people realize that this product is exactly what they need. It could be practical and useful information as well: the size of the product, material that it is made of, or care instructions.",
    price: 90,
    image: "/images/site/tild3438-3261-4236-a531-356133386533__image.png",
  },
  {
    id: "sac-marin-yellow",
    title: "Sac Marin Yellow",
    shortDescription:
      "Marinetmarine store backpack. The Sac Marin can be worn as a backpack or as a bag over one shoulder.",
    detailDescription:
      "Add here some interesting details about the product. Help people realize that this product is exactly what they need. It could be practical and useful information as well: the size of the product, material that it is made of, or care instructions.",
    price: 108,
    image: "/images/site/tild3262-3937-4162-b961-663562666366__image.png",
  },
];
