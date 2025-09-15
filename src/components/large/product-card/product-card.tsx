import { useState } from "react";
import FullViewportImage from "../full-viewport-image/full-viewport-image";
import type { GetAllClothesData } from "../../../types/clothes.types";

export default function ProductCard(props: GetAllClothesData) {
  const [imageUrl, setImageUrl] = useState("");
  const [currImageIndex, setCurrImageIndex] = useState(0);

  const setToNext = () => {
    setCurrImageIndex(
      currImageIndex === props.images.length - 1 ? 0 : currImageIndex + 1
    );
  };

  const setToPrev = () => {
    setCurrImageIndex(
      currImageIndex === 0 ? props.images.length - 1 : currImageIndex - 1
    );
  };

  function handleSetExpandImage(url: string) {
    setImageUrl(url);
  }

  return (
    <article
      id="product-card"
      className="color-accent color-accent-content rounded-lg solid-border"
    >
      <div className="h-auto w-full aspect-square rounded-lg overflow-hidden cursor-pointer">
        <div className="w-full h-full overflow-hidden">
          <span className="relative w-full h-full">
            <img
              src={props.images[currImageIndex].url || "/placeholder.svg"}
              alt={props.title}
              className="bg-contain bg-center bg-no-repeat transition scale-100 hover:scale-110"
              onClick={() => handleSetExpandImage(props.images[currImageIndex].url)}
            />
            <button
              onClick={setToPrev}
              className="absolute color-neutral top-1/2 left-1"
            >
              ◀
            </button>
            <button
              onClick={setToNext}
              className="absolute color-neutral top-1/2 right-1"
            >
              ▶
            </button>
          </span>
        </div>
      </div>
      {imageUrl && (
        <FullViewportImage imageUrl={imageUrl} setImageUrl={setImageUrl} />
      )}
      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block bg-secondary text-secondary-foreground text-xs font-medium px-2 py-1 rounded-full">
            {props.category}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-card-foreground mb-2 text-balance">
          {props.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary line-through">
            &#8377;{props.actualPrice}
          </span>
        </div>
      </div>
    </article>
  );
}
