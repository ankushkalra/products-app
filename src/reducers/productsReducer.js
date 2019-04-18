import _ from "lodash";
import { UPDATE_PRODUCT } from "../actions/index";
import { products } from "../products";

export default function(state = _.mapKeys(products, "id"), action) {
  switch (action.type) {
    case UPDATE_PRODUCT:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
}
