import amazonWatchImage from "@/assets/alganee-amazon-watch.jpg.asset.json";
import braceletImage from "@/assets/alganee-bracelet-preview.jpg";
import earringsImage from "@/assets/alganee-earrings-editorial.jpg";

export type ProductCategory = "Watches" | "Jewellery";

export type AlganeeProduct = {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  image: string;
  imageAlt: string;
  badge: string;
  amazonUrl?: string;
  price?: string;
  isPlaceholder?: boolean;
};

export const amazonProductUrl =
  "https://www.amazon.in/gp/product/B0HLXDSR12/ref=cx_skuctr_share_ls_srb?smid=A3C866BRGP0529&tag=ShopReferral_dad8e8c3-0b59-41a0-87f0-9ca0e7a890d8/";

export const alganeeProducts: AlganeeProduct[] = [
  {
    id: "pearl-charm-bracelet-watch",
    name: "Crystal & Pearl Bracelet Watch",
    category: "Watches",
    description:
      "A gold-tone quartz watch with crystal-detailed bracelet links, a crisp ivory dial and a delicate pearl charm.",
    image: amazonWatchImage.url,
    imageAlt: "Gold-tone crystal bracelet watch with an ivory dial and pearl charm",
    badge: "Shop on Amazon",
    amazonUrl: amazonProductUrl,
    price: "₹850",
  },
  {
    id: "floral-pearl-jhumkas",
    name: "Floral Pearl Jhumkas",
    category: "Jewellery",
    description:
      "An ornate, festive-inspired pair in warm gold tones, with floral crystal details and fine pearl accents.",
    image: earringsImage,
    imageAlt: "Gold-toned floral jhumka earrings with crystal and pearl details",
    badge: "Coming soon",
    isPlaceholder: true,
  },
  {
    id: "pearl-accent-bracelets",
    name: "Pearl Accent Bracelets",
    category: "Jewellery",
    description:
      "A graceful golden stack with pearl detailing, imagined for festive dressing and everyday heirloom charm.",
    image: braceletImage,
    imageAlt: "Gold-tone bangles with pearl accents arranged on ivory silk",
    badge: "Coming soon",
    isPlaceholder: true,
  },
];