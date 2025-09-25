import type { Dispatch } from "react";
import { X } from "lucide-react";

// props
interface FullViewportImageProps {
  imageUrl: string;
  setImageUrl: Dispatch<React.SetStateAction<string>>;
}

// displaying image for full screen view
export default function FullViewportImage(props: FullViewportImageProps) {
  return (
    <section
      id="full-viewport-image"
      className="fixed z-50 inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.95)]"
    >
      <X
        strokeWidth={1.25}
        className="color-base-content absolute top-0 right-0 z-50 h-11 w-11 cursor-pointer"
        onClick={() => props.setImageUrl("")}
      />
      <div className="absolute max-h-screen h-[75vh] sm:h-[85vh] md:h-[95vh] aspect-[9/12]">
        <img
          src={props.imageUrl}
          className="w-full h-full bg-center bg-no-repeat"
          alt="Product card image"
        />
      </div>
    </section>
  );
}
