import useFetch from "../../../hooks/use-fetch";
import type { GetAllClothesResponse } from "../../../types/clothes.types";
import SkeletonLoader from "../../small/skeleton/skeleton";
import ProductCard from "../product-card/product-card";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const URL = BACKEND_BASE_URL + "/api/v1/users/clothes/all?is_top_3=true";
const OPTIONS: RequestInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
};

export default function BestSellingProducts() {
  const { data, error, loading } = useFetch<GetAllClothesResponse>({
    url: URL,
    options: OPTIONS,
  });

  return (
    <section
      id="best-selling-products"
      className="color-base-100 color-base-content py-7 max-w-7xl"
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl text-center">
        Our best selling products
      </h2>
      <p className="text-center text-sm">Don't Miss Out</p>
      {!loading && data ? (
        // auto-fit → The grid will create as many columns as can fit into the container’s width
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,250px))] justify-center gap-1 p-10">
          {data.clothes.map((cloth) => (
            <ProductCard
              _id={cloth._id}
              title={cloth.title}
              category={cloth.category}
              isTop3={cloth.isTop3}
              images={cloth.images}
              actualPrice={cloth.actualPrice}
              discountedPrice={cloth.discountedPrice}
              createdAt={cloth.createdAt}
              updatedAt={cloth.updatedAt}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,250px))] justify-center gap-1 p-10">
          {["1", "2", "3", "4"].map(() => (
            <SkeletonLoader lines={5} />
          ))}
        </div>
      )}
    </section>
  );
}
