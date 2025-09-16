import { useState } from "react";
import { Expand, Flame, ChevronLeft, ChevronRight } from "lucide-react";
import FullViewportImage from "../full-viewport-image/full-viewport-image";
import type { GetAllClothesData } from "../../../types/clothes.types";

export default function ProductCard(props: GetAllClothesData) {
  // full view image state
  const [imageUrl, setImageUrl] = useState("");

  // current image index
  const [currImageIndex, setCurrImageIndex] = useState(0);

  // next image
  const setToNext = () => {
    setCurrImageIndex(
      currImageIndex === props.images.length - 1 ? 0 : currImageIndex + 1
    );
  };

  // prev image
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
      className="color-base-300 color-base-content rounded-lg solid-border"
    >
      {/* image field */}
      <div className="h-auto w-full aspect-[9/12] rounded-lg overflow-hidden cursor-pointer">
        <div className="relative w-full h-full aspect-[9/12] overflow-hidden">
          <img
            src={props.images[currImageIndex].url || "/placeholder.svg"}
            alt={props.title}
            className="w-full h-full object-fill bg-center bg-no-repeat transition scale-100 hover:scale-110"
          />
          {/* absolute elements for controls */}
          <button
            onClick={setToPrev}
            className="absolute top-1/2 left-1 cursor-pointer"
          >
            <ChevronLeft
              strokeWidth={1.25}
              className="w-7 h-auto text-white bg-black/50 rounded-full"
            />
          </button>
          <button
            onClick={setToNext}
            className="absolute top-1/2 right-1 bg-transparent cursor-pointer"
          >
            <ChevronRight
              strokeWidth={1.25}
              className="w-7 h-auto text-white bg-black/50 rounded-full"
            />
          </button>
          <button
            onClick={() =>
              handleSetExpandImage(props.images[currImageIndex].url)
            }
            className="absolute right-1 bottom-1 bg-transparent cursor-pointer"
          >
            <Expand
              strokeWidth={1.25}
              className="w-7 h-auto backdrop-blur-xs text-white bg-black/50 rounded-full"
            />
          </button>
          {props.isTop3 && (
            <span className="absolute top-1 right-1">
              <Flame
                strokeWidth={1.25}
                className="w-7 h-auto text-amber-400 fill-amber-400 bg-black/50 rounded-full"
              />
            </span>
          )}
        </div>
      </div>
      {/* full view image */}
      {imageUrl && (
        <FullViewportImage imageUrl={imageUrl} setImageUrl={setImageUrl} />
      )}
      {/* other fields */}
      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block color-info color-info-content text-xs font-medium px-2 py-1 rounded-full">
            {props.category}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-card-foreground mb-2 text-balance">
          {props.title}
        </h3>
        <div className="flex items-center justify-start gap-1">
          <span className="color-error color-error-content rounded-full p-1 text-2xl font-bold line-through">
            &#8377;{props.actualPrice}
          </span>
          <span className="color-success color-success-content rounded-full p-1 text-2xl font-bold">
            &#8377;{props.discountedPrice}
          </span>
        </div>
      </div>
    </article>
  );
}
