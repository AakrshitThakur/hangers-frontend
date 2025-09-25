import { useState, useEffect } from "react";
import { Shirt, Plus } from "lucide-react";
import SearchClothes from "../../components/large/search-clothes/search-clothes";
import type { GetAllClothesResponse } from "../../types/clothes.types";
import useFetch from "../../hooks/use-fetch";
import ProductCard from "../../components/large/product-card/product-card";
import SkeletonLoader from "../../components/small/skeleton/skeleton";
import { errorNotification } from "../../utils/toast.utils";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const URL = BACKEND_BASE_URL + "/api/v1/admins/clothes/all";
const OPTIONS: RequestInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
};

export default function AdminViewAllClothes() {
  const [url, setUrl] = useState<string>(URL);

  const { data, error, loading } = useFetch<GetAllClothesResponse>({
    url,
    options: OPTIONS,
  });

    useEffect(() => {
    if (error) errorNotification(error);
  }, [error]);

  return (
    <div id="admin-view-all-clothes" className="min-h-[85vh]">
      <div className="color-accent color-base-accent p-10 flex flex-col justify-start gap-5 items-center mb-1">
        <h1 className="flex justify-center items-center gap-1 text-center font-semibold text-2xl sm:text-3xl md:text-3xl">
          {/* <span className="inline-flex justify-center items-center color-warning color-warning-content w-11 h-11 rounded-full">
          <UserStar
            className="inline-block w-7 h-7"
            strokeWidth={1.25}
          />
          </span> */}
          <span className="inline-block w-12 h-12 aspect-square">
            <img className="object-fill" src="/images/hi.png" alt="" />
          </span>
          Admin
        </h1>
        <SearchClothes setUrl={setUrl} />
      </div>
      <section
        id="view-clothes"
        className="relative color-base-100 color-base-content grid grid-cols-[repeat(auto-fit,minmax(200px,250px))] justify-center gap-1 p-10"
      >
        {/* add new cloth */}
        <a href="/admins/clothes/create" className="absolute top-2 right-2 color-success color-success-content w-9 h-9 rounded-full cursor-pointer">
          <Plus className="w-full h-full rounded-full" strokeWidth={1.25} />
        </a>
        {/* <a href="/admins/clothes/create" className="absolute color-success top-1 right-1 w-11 h-11 solid-border rounded-full cursor-pointer p-[0.15rem]">
          <img src="/images/add.png" alt="" />
        </a> */}

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
              isAdmin={true}
            />
          ))
        )}
      </section>
    </div>
  );
}
