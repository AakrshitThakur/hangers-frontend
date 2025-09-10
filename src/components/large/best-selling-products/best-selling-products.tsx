import ProductCard from "../product-card/product-card";

export default function BestSellingProducts() {
  return (
    <section
      id="best-selling-products"
      className="color-base-300 color-base-content py-7 max-w-7xl"
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl text-center">Our best selling products</h2>
      <p className="text-center text-sm mb-3">Don't Miss Out</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <ProductCard
          image="/images/lehenga1.jpg"
          title="Premium Wireless Headphones"
          category="Electronics"
          price={299.99}
        />
        <ProductCard
          image="/images/lehenga2.jpg"
          title="Classic Leather Jacket"
          category="Fashion"
          price={189.99}
        />
        <ProductCard
          image="/images/lehenga3.jpg"
          title="Artisan Coffee Beans"
          category="Food & Beverage"
          price={24.99}
        />
      </div>
    </section>
  );
}
