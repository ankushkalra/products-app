export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export function updateProduct(product, callback) {
  return {
    type: UPDATE_PRODUCT,
    payload: product
  };
}