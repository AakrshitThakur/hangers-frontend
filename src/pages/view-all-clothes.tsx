import { useState, useEffect } from "react";
import SearchClothes from "../components/large/search-clothes/search-clothes";
import type { GetAllClothesResponse } from "../types/clothes.types";
import useFetch from "../hooks/use-fetch";
import ProductCard from "../components/large/product-card/product-card";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const URL =
  BACKEND_BASE_URL +
  "/api/v1/users/clothes/all?category=lehengas&sort=new_clothes";
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

  if (data) console.log(data);
  if (error) console.log(error);
  if (loading) console.log(loading);

  return (
    <div id="view-all-clothes">
      <SearchClothes />
      <section
        id="view-clothes"
        className="color-base-100 color-base-content grid grid-cols-[repeat(auto-fit,minmax(200px,250px))] justify-center gap-1 p-10"
      >
        {data &&
          data.clothes.map((cloth) => (
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
      </section>
    </div>
  );
}
