export default function Hero() {
  return (
    <section
      id="hero"
      className="relative color-base-200 h-[75vh] bg-[url(/images/hero-mobile.png)] bg-center md:bg-[url(/images/hero-desktop.png)] bg-contain bg-no-repeat max-w-7xl md:pr-16 lg:pr-18 xl:pr-20 md:pt-16 lg:pt-18 xl:pt-20"
    >
      {/* desktop-hero */}
      <div className="hidden absolute inset-0 bg-[rgba(0,0,0,0.75)] md:flex md:flex-col md:justify-center md:items-center md:gap-2 text-center">
        <h1 className="md:text-4xl lg:text-5xl xl:text-6xl font-bold">
          From Casual Classics to Timeless <br /> Ethnic Elegance
        </h1>
        <address className="text-base">
          ~ Shop No. 1, Near Taxi Stand, Railway Road, Una - 174315
        </address>
        {/* Desktop CTA Buttons */}
        <div>
          <a href="">
            <button className="inline-flex items-center justify-center rounded-md color-secondary color-secondary-content px-3 py-2 cursor-pointer">
              Get Started
            </button>
          </a>
        </div>
      </div>
      {/* mobile-hero */}
      <div className="md:hidden absolute inset-0 bg-[rgba(0,0,0,0.75)] flex flex-col justify-center gap-2">
        <h1 className="text-3xl font-bold text-center">
          From Casual Classics to Timeless <br /> Ethnic Elegance
        </h1>
        <address className="text-base text-center">
          ~ Shop No. 1, Near Taxi Stand, Railway Road, Una - 174315
        </address>
        {/* Desktop CTA Buttons */}
        <div className="text-center">
          <button className="inline-flex items-center justify-center rounded-md color-secondary color-secondary-content px-3 py-2">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}
