import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Dropdown } from "../../small/drop-down/drop-down";
import {
  CLOTH_CATEGORIES,
  SORT_CLOTHES,
  TOP_3_CLOTHES,
} from "../../../constants/cloth.constants";
import useDebounce from "../../../hooks/use-debounce";

interface SearchClothesProps {
  setUrl: React.Dispatch<React.SetStateAction<string>>;
}

interface SetSearchParamsProps {
  category: string;
  search: string;
  sort: string;
  is_top_3: string;
}

// constants
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const URL = BACKEND_BASE_URL + "/api/v1/users/clothes/all";

export default function SearchClothes(props: SearchClothesProps) {
  const [searchParams, setSearchParams] = useState({
    category: "",
    search: "",
    sort: "",
    is_top_3: "",
  });

  const debouncedSearch = useDebounce(searchParams.search, 500);

  // handle submit
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  // handle change
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const target = e.target;
    setSearchParams({ ...searchParams, [target.name]: target.value });
  }

  useEffect(() => {
    // set new params in url
    const urlWithParams = `${URL}?search=${debouncedSearch}&category=${searchParams.category}&sort=${searchParams.sort}&is_top_3=${searchParams.is_top_3}`;

    props.setUrl(urlWithParams);
  }, [
    debouncedSearch,
    searchParams.category,
    searchParams.sort,
    searchParams.is_top_3,
  ]);

  return (
    <section
      id="view-all-clothes"
      className="color-accent color-base-accent w-full flex flex-col justify-center items-center"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-3 w-full max-w-2xl"
      >
        <div className="color-base-200 color-base-content solid-border relative flex items-center w-full rounded-full">
          {/* Search Icon */}
          <div className="absolute left-3 flex items-center">
            <Search className="h-4 w-4" />
          </div>
          {/* Input Field */}
          <input
            type="text"
            name="search"
            value={searchParams.search}
            onChange={handleChange}
            placeholder="Search clothes..."
            className="w-full pl-10 pr-20 py-3 text-sm"
          />
        </div>
        {/* all filters */}
        <div className="flex justify-center items-center gap-5 text-xs">
          <div>
            <Dropdown<SetSearchParamsProps>
              set={{ setState: setSearchParams, name: "sort" }}
              options={SORT_CLOTHES}
              placeholder="---Sort---"
            />
          </div>
          <div>
            <Dropdown<SetSearchParamsProps>
              set={{ setState: setSearchParams, name: "category" }}
              options={CLOTH_CATEGORIES}
              placeholder="---Categories---"
            />
          </div>
          <div>
            <Dropdown<SetSearchParamsProps>
              set={{ setState: setSearchParams, name: "is_top_3" }}
              options={TOP_3_CLOTHES}
              placeholder="---Top 3---"
            />
          </div>
        </div>
      </form>
    </section>
  );
}
