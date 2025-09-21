import type { CreateCloth } from "../../types/clothes.types";
import { CLOTH_CATEGORY_VALUES } from "../../constants/cloth.constants";

const TITLE = /^.{3,64}$/;

function validateCreateCloth(input: CreateCloth) {
  // validation errors
  const errors = {
    title: "",
    clothImages: "",
    isTop3: "",
    category: "",
    actualPrice: "",
    discountedPrice: "",
    hasErrors: false,
  };

  // check all properties
  if (!TITLE.test(input.title.trim())) {
    errors.title = "Title must be between 3 and 64 characters long";
    errors.hasErrors = true;
  }
  if (!parseInt(input.actualPrice)) {
    errors.actualPrice = "Enter a valid actual price";
    errors.hasErrors = true;
  }
  if (!parseInt(input.discountedPrice)) {
    errors.discountedPrice = "Enter a valid discounted price";
    errors.hasErrors = true;
  }
  if (parseInt(input.actualPrice) < parseInt(input.discountedPrice)) {
    errors.actualPrice = errors.discountedPrice =
      "Actual/original price must be greater than or equal to the discounted price";
    errors.hasErrors = true;
  }
  if (!CLOTH_CATEGORY_VALUES.includes(input.category)) {
    errors.category = "An appropriate clothing category must be selected";
    errors.hasErrors = true;
  }
  if (input.clothImages.length >= 4) {
    errors.clothImages = "Maximum of three images allowed";
    errors.hasErrors = true;
  }
  //   if (!TOP_3_CLOTH_VALUES.includes(`${input.isTop3}`)) {
  //     errors.category = "An appropriate is top 3 must be selected";
  //     errors.hasErrors = true;
  //   }

  // return all errors
  return errors;
}

export { validateCreateCloth };
