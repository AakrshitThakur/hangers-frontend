import { Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative color-base-200 h-[75vh] bg-[url(/images/hero-mobile.png)] bg-center md:bg-[url(/images/hero-desktop.png)] bg-contain bg-no-repeat md:pr-16 lg:pr-18 xl:pr-20 md:pt-16 lg:pt-18 xl:pt-20"
    >
      {/* desktop-hero */}
      <div className="hidden absolute inset-0 bg-[rgba(0,0,0,0.85)] md:flex md:flex-col md:justify-center md:items-center md:gap-2 text-center">
        <h1 className="md:text-4xl lg:text-5xl xl:text-6xl font-bold">
          From Casual Classics to Timeless <br /> Ethnic Elegance
        </h1>
        <address className="inline text-base text-center">
          ~ Flat No. 302, Shanti Residency, Sector 12, Vasant Vihar, Madhya Pradesh 462016, India{" "}
          <MapPin strokeWidth={1.25} className="inline h-auto w-4" />
        </address>
        <a className="flex justify-center items-center gap-1 text-base text-center" href="tel:+91XXX777YYYY">
          ~ (+91) XXX777YYYY <Phone strokeWidth={1.25} className="inline h-4 w-4" />
        </a>
        {/* Desktop CTA Buttons */}
        <div>
          <Link to="/view-all-clothes">
            <button className="inline-flex items-center justify-center rounded-md color-secondary color-secondary-content px-3 py-2 cursor-pointer">
              Browse Collections
            </button>
          </Link>
        </div>
      </div>
      {/* mobile-hero */}
      <div className="md:hidden absolute inset-0 bg-[rgba(0,0,0,0.85)] flex flex-col justify-center gap-2">
        <h1 className="text-3xl font-bold text-center">
          From Casual Classics to Timeless <br /> Ethnic Elegance
        </h1>
        <address className="text-base not-italic text-center">
          <span className="inline items-center gap-2">
            ~ Shop No. 1, Near Taxi Stand, Railway Road, Una - 174315{" "}
            <MapPin strokeWidth={1.25} className="inline h-auto w-4" />
          </span>
        </address>
        <a className="inline text-base text-center" href="tel:+917018904318">
          ~ (+91) 7018904318 <Phone strokeWidth={1.25} className="inline h-auto w-4" />
        </a>
        {/* Mobile CTA Buttons */}
        <Link to="/view-all-clothes" className="text-center">
          <button className="inline-flex items-center justify-center rounded-md color-secondary color-secondary-content cursor-pointer px-3 py-2">
            Browse Collections
          </button>
        </Link>
      </div>
    </section>
  );
}
