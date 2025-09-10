import { useState } from "react";
import FullViewportImage from "../full-viewport-image/full-viewport-image";

interface ProductCardProps {
  image: string;
  title: string;
  category: string;
  price: number;
}

export default function ProductCard({
  image,
  title,
  category,
  price,
}: ProductCardProps) {
  const [imageUrl, setImageUrl] = useState("");

  function handleSetExpandImage(url: string) {
    setImageUrl(url);
  }
  return (
    <article
      id="product-card"
      className="color-accent color-accent-content rounded-lg solid-border"
    >
      <div className="h-auto w-full aspect-square overflow-hidden rounded-lg cursor-pointer">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="bg-contain bg-center bg-no-repeat transition scale-100 hover:scale-110"
          onClick={() => handleSetExpandImage(image)}
        />
      </div>
      {imageUrl && (
        <FullViewportImage imageUrl={imageUrl} setImageUrl={setImageUrl} />
      )}
      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block bg-secondary text-secondary-foreground text-xs font-medium px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-card-foreground mb-2 text-balance">
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary line-through">
            &#8377;{price.toFixed(2)}
          </span>
        </div>
      </div>
    </article>
  );
}
