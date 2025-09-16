const CLOTH_CATEGORIES = [
  "---Categories---",
  "lehengas",
  "sarees",
  "formals",
  "informals",
  "shirts",
  "pants",
  "jeans",
  "tops",
  "bottoms",
];

const SORT_CLOTHES = [
  { queryValue: "", display: "---Sort Clothes---" },
  { queryValue: "new_clothes", display: "New Clothes" },
  { queryValue: "old_clothes", display: "Old Clothes" },
  { queryValue: "actual_price_desc", display: "↑ Actual price" },
  { queryValue: "actual_price_asc", display: "↓ Actual price" },
  { queryValue: "discounted_price_desc", display: "↑ Discounted price" },
  { queryValue: "discounted_price_asc", display: "↓ Discounted price" },
];

const TOP_3_CLOTHES = [
  { queryValue: "", display: "---Top 3 Clothes---" },
  { queryValue: true, display: "Include top 3" },
  { queryValue: false, display: "Exclude top 3" },
];

export { CLOTH_CATEGORIES, SORT_CLOTHES, TOP_3_CLOTHES };
