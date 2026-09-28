export type InnovationData = {
  product: string;
  ingredients: string;
};

export function getInnovationData(): InnovationData {
  if (typeof window === "undefined") {
    return {
      product: "",
      ingredients: "",
    };
  }

  return {
    product: localStorage.getItem("vedantra_product") || "",
    ingredients: localStorage.getItem("vedantra_ingredients") || "",
  };
}

export function saveInnovationData(
  product: string,
  ingredients: string
) {
  if (typeof window === "undefined") return;

  localStorage.setItem("vedantra_product", product);
  localStorage.setItem("vedantra_ingredients", ingredients);
}
