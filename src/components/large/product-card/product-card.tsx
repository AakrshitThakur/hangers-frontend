import { useState } from "react";
import { Link } from "react-router-dom";
import { Expand, Flame, ChevronLeft, ChevronRight, Pen, Trash2, Plus, Minus } from "lucide-react";
import FullViewportImage from "../full-viewport-image/full-viewport-image";
import type { GetClothData } from "../../../types/clothes.types";

function setProductQuantityInitialValue(_id: string): number {
  const cart = localStorage.getItem(_id);
  if (!cart) return 0;
  const cartObj = JSON.parse(cart);
  return cartObj.quantity;
}

// handles both users and admins requests
export default function ProductCard(props: GetClothData) {
  // full view image state
  const [imageUrl, setImageUrl] = useState("");

  // current image index
  const [currImageIndex, setCurrImageIndex] = useState(0);

  const [productQuantity, setProductQuantity] = useState(setProductQuantityInitialValue(props._id));

  // useEffect(() => {
  //   const cart = localStorage.getItem(props._id);
  //   if (!cart && productQuantity === 0) return;
  //   // create a fresh new cart item
  //   if (!cart) {
  //     const cartJson = JSON.stringify({ title: props.title, price: props.actualPrice, quantity: productQuantity });
  //     localStorage.setItem(props._id, cartJson);
  //     return;
  //   }
  //   const cartObj = JSON.parse(cart);
  //   cartObj.quantity = productQuantity;
  //   const cartJson = JSON.stringify(cartObj);
  //   localStorage.setItem(props._id, cartJson);
  // }, [productQuantity]);

  function addToCart(_id: string, title: string, price: string) {
    // validate input
    if (!_id || !title || !price) return;

    const cart = localStorage.getItem("hangers-shopping-cart");

    const cartObj = !cart && typeof cart === "object" ? {} : JSON.parse(cart);
    if (!cartObj._id && productQuantity === 0) return;

    // create a fresh new cart item
    if (!cartObj[_id]) cartObj[_id] = { title, price, quantity: productQuantity };
    else {
      const cartItem = cartObj[_id];
      cartItem.quantity = productQuantity;
    }
    localStorage.setItem("hangers-shopping-cart", JSON.stringify(cartObj));
  }

  // next image
  const setToNext = () => {
    setCurrImageIndex(currImageIndex === props.images.length - 1 ? 0 : currImageIndex + 1);
  };

  // prev image
  const setToPrev = () => {
    setCurrImageIndex(currImageIndex === 0 ? props.images.length - 1 : currImageIndex - 1);
  };

  function handleSetExpandImage(url: string) {
    setImageUrl(url);
  }

  return (
    <article id="product-card" className="color-base-300 color-base-content rounded-lg solid-border">
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
            <ChevronLeft strokeWidth={1.25} className="w-full h-full text-white bg-black/50" />
          </button>
          <button
            onClick={setToNext}
            className="absolute w-9 h-auto right-1 top-1/2 -translate-y-1/2 rounded-full overflow-hidden cursor-pointer"
          >
            <ChevronRight strokeWidth={1.25} className="w-full h-full text-white bg-black/50" />
          </button>
          <button
            onClick={() => handleSetExpandImage(props.images[currImageIndex].url)}
            className="absolute right-1 bottom-1 cursor-pointer"
          >
            <Expand strokeWidth={1.25} className="w-7 h-auto backdrop-blur-xs text-white bg-black/50 p-1 rounded-full" />
          </button>

          {/* Show a flame icon if cloth is top-3 */}
          {props.isTop3 && (
            <span className="absolute w-7 h-auto right-1 top-1 rounded-full overflow-hidden cursor-pointer">
              <Flame strokeWidth={1.25} className="w-full h-full text-amber-400 fill-amber-400 bg-black/50 p-1" />
            </span>
          )}

          {/* add update and delete buttons for admin */}
          {props.isAdmin && (
            <>
              <Link
                to={`/admins/clothes/${props._id}/update`}
                onClick={() => handleSetExpandImage(props.images[currImageIndex].url)}
                className="absolute w-7 h-auto left-1 bottom-1 rounded-full overflow-hidden cursor-pointer"
              >
                <Pen strokeWidth={1.25} className="w-full h-full text-white bg-black/50 p-1" />
              </Link>
              <Link
                to={`/admins/clothes/${props._id}/delete`}
                onClick={() => handleSetExpandImage(props.images[currImageIndex].url)}
                className="absolute w-7 h-auto left-1 top-1 rounded-full overflow-hidden cursor-pointer"
              >
                <Trash2 strokeWidth={1.25} className="w-7 h-auto text-white bg-black/50 p-1" />
              </Link>
            </>
          )}
        </div>
      </div>
      {/* full view image */}
      {imageUrl && <FullViewportImage imageUrl={imageUrl} setImageUrl={setImageUrl} />}
      {/* other fields */}
      <div className="space-y-2 p-3">
        <div>
          <span className="inline-block color-info color-info-content text-xs font-medium px-2 py-1 rounded-full">
            {props.category}
          </span>
        </div>
        {/* product-title */}
        <h3 className="text-xl font-semibold text-card-foreground text-balance">{props.title}</h3>
        {/* product-prices */}
        <div className="flex items-center justify-start gap-1">
          <span className="color-error color-error-content rounded-full p-1 text-2xl font-bold line-through">
            &#8377;{props.actualPrice}
          </span>
          <span className="color-success color-success-content rounded-full p-1 text-2xl font-bold">
            &#8377;{props.discountedPrice}
          </span>
        </div>
        {/* add to shopping cart */}
        <div className="flex items-center justify-end gap-2">
          <div className="flex items-center gap-1">
            <span
              className="color-base-100 color-base-content inline-block w-5 h-5 rounded-full overflow-hidden cursor-pointer border p-0.5"
              onClick={() => setProductQuantity((curr) => (curr === 5 ? 5 : curr + 1))}
            >
              <Plus strokeWidth={1.25} className="w-full h-full" />
            </span>
            <span className="color-base-100 color-base-content flex justify-center items-center text-base rounded-md border w-7 h-7">
              {productQuantity}
            </span>
            <span
              className="color-base-100 color-base-content inline-block w-5 h-5 rounded-full overflow-hidden cursor-pointer border p-0.5"
              onClick={() => setProductQuantity((curr) => (curr <= 0 ? 0 : curr - 1))}
            >
              <Minus strokeWidth={1.25} className="w-full h-full" />
            </span>
          </div>
          <button
            className="inline-flex items-center justify-center rounded-md color-secondary color-secondary-content px-2 py-1 leading-tight cursor-pointer"
            onClick={() => addToCart(props._id, props.title, props.actualPrice)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
