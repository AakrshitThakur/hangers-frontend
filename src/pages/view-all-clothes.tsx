import { useState } from "react";
import { Shirt } from "lucide-react";
import SearchClothes from "../components/large/search-clothes/search-clothes";
import type { GetAllClothesResponse } from "../types/clothes.types";
import useFetch from "../hooks/use-fetch";
import ProductCard from "../components/large/product-card/product-card";
import SkeletonLoader from "../components/small/skeleton/skeleton";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const URL = BACKEND_BASE_URL + "/api/v1/users/clothes/all";
const OPTIONS: RequestInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
};

export default function ViewAllClothes() {
  const [url, setUrl] = useState<string>(URL);

  const { data, error, loading } = useFetch<GetAllClothesResponse>({
    url,
    options: OPTIONS,
  });

  console.log(data?.clothes);

  return (
    <div id="view-all-clothes" className="min-h-[85vh]">
      <SearchClothes setUrl={setUrl} />
      <section
        id="view-clothes"
        className="color-base-100 color-base-content grid grid-cols-[repeat(auto-fit,minmax(200px,250px))] justify-center gap-1 p-10"
      >
        {/* loading skeletons */}
        {loading &&
          !data &&
          ["1", "2", "3", "4"].map(() => <SkeletonLoader lines={5} />)}

        {/* display data */}
        {!loading && data?.clothes.length === 0 ? (
          <p className="text-center text-base">
            No <Shirt strokeWidth={1.25} className="inline fill-red-400" /> were
            found
          </p>
        ) : (
          data?.clothes.map((cloth) => (
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
          ))
        )}
      </section>
    </div>
  );
}
