import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Expand,
  Flame,
  ChevronLeft,
  ChevronRight,
  Pen,
  Trash2,
} from "lucide-react";
import FullViewportImage from "../full-viewport-image/full-viewport-image";
import type { GetClothData } from "../../../types/clothes.types";

// handles both users and admins requests
export default function ProductCard(props: GetClothData) {
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
            src={props.images[currImageIndex]?.url || "/placeholder.svg"}
            alt={props.title}
            className="w-full h-full object-cover object-center transition scale-100 hover:scale-110"
          />
          {/* absolute elements for controls */}
          <button
            onClick={setToPrev}
            className="absolute w-9 h-auto left-1 top-1/2 -translate-y-1/2 rounded-full overflow-hidden cursor-pointer"
          >
            <ChevronLeft
              strokeWidth={1.25}
              className="w-full h-full text-white bg-black/50"
            />
          </button>
          <button
            onClick={setToNext}
            className="absolute w-9 h-auto right-1 top-1/2 -translate-y-1/2 rounded-full overflow-hidden cursor-pointer"
          >
            <ChevronRight
              strokeWidth={1.25}
              className="w-full h-full text-white bg-black/50"
            />
          </button>
          <button
            onClick={() =>
              handleSetExpandImage(props.images[currImageIndex].url)
            }
            className="absolute right-1 bottom-1 cursor-pointer"
          >
            <Expand
              strokeWidth={1.25}
              className="w-7 h-auto backdrop-blur-xs text-white bg-black/50 p-1 rounded-full"
            />
          </button>

          {/* Show a flame icon if cloth is top-3 */}
          {props.isTop3 && (
            <span className="absolute w-7 h-auto right-1 top-1 rounded-full overflow-hidden cursor-pointer">
              <Flame
                strokeWidth={1.25}
                className="w-full h-full text-amber-400 fill-amber-400 bg-black/50 p-1"
              />
            </span>
          )}

          {/* add update and delete buttons for admin */}
          {props.isAdmin && (
            <>
              <Link
                to={`/admins/clothes/${props._id}/update`}
                onClick={() =>
                  handleSetExpandImage(props.images[currImageIndex].url)
                }
                className="absolute w-7 h-auto left-1 bottom-1 rounded-full overflow-hidden cursor-pointer"
              >
                <Pen
                  strokeWidth={1.25}
                  className="w-full h-full text-white bg-black/50 p-1"
                />
              </Link>
              <Link
                to={`/admins/clothes/${props._id}/delete`}
                onClick={() =>
                  handleSetExpandImage(props.images[currImageIndex].url)
                }
                className="absolute w-7 h-auto left-1 top-1 rounded-full overflow-hidden cursor-pointer"
              >
                <Trash2
                  strokeWidth={1.25}
                  className="w-7 h-auto text-white bg-black/50 p-1"
                />
              </Link>
            </>
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
