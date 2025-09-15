import { useState, useEffect } from "react";
import SearchClothes from "../components/large/search-clothes/search-clothes";
import type { GetAllClothesResponse } from "../types/clothes.types";
import useFetch from "../hooks/use-fetch";
import ProductCard from "../components/large/product-card/product-card";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const URL =
  BACKEND_BASE_URL +
  "/api/v1/users/clothes/all?category=formals&sort=old clothes";
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
        id="view-cloths"
        className="color-base-200 color-base-content grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
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
