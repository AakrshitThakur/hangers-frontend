import { useState } from "react";
import { Search } from "lucide-react";
import { CLOTH_CATEGORIES } from "../../../constants/cloth.constants";
import { capitalizeFirstChar } from "../../../utils/capitalize-first-char";
import { SORT_CLOTHES } from "../../../constants/cloth.constants";

export default function SearchClothes() {
  const [query, setQuery] = useState("");

  function handleSubmit() {}
  function handleChange() {}

  const handleClear = () => {};

  return (
    <section
      id="view-all-clothes"
      className="color-accent color-base-accent h-[75vh] p-10 flex flex-col justify-start gap-5 items-center"
    >
      <h1 className="text-center text-2xl sm:text-3xl md:text-3xl">
        Discover the Elegance of Hangers Apparel
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-3 w-full max-w-2xl"
      >
        <div className="color-base-200 color-base-content solid-border relative flex items-center w-full text-base rounded-full">
          {/* Search Icon */}
          <div className="absolute left-3 flex items-center">
            <Search className="h-4 w-4" />
          </div>
          {/* Input Field */}
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search clothes..."
            className="w-full pl-10 pr-20 py-3 text-sm"
          />
        </div>
        <div className="flex justify-center items-center gap-5 text-base">
          <div className="color-base-200 color-base-content solid-border p-2 rounded-full">
            <select className="rounded-xl" name="" id="">
              {CLOTH_CATEGORIES.map((c) => (
                <option className="color-base-200 color-base-content" value={c}>
                  {capitalizeFirstChar(c)}
                </option>
              ))}
            </select>
          </div>
          <div className="color-base-200 color-base-content solid-border p-2 rounded-full">
            <select name="" id="">
              {SORT_CLOTHES.map((c) => (
                <option value={c}>{capitalizeFirstChar(c)}</option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </section>
  );
}
