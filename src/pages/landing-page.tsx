import Hero from "../components/large/hero/hero";
import BestSellingProducts from "../components/large/best-selling-products/best-selling-products";

export default function LandingPage() {
  return (
    <div
      id="landing-page" className="w-full max-w-7xl"
    >
      <Hero />
      <BestSellingProducts />
    </div>
  );
}
