import { actionTypes } from '../constants';

export const initProductsState = (initialData) => {
  return {
    data: initialData,
    isLoading: false,
    productError: false,
  };
};

export const productsReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_DATA:
      return {
        ...state,
        isLoading: true,
        productError: false,
      };
    case actionTypes.FETCH_PRODUCT_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        productError: false,
        data: action.payload,
      };
    case actionTypes.FETCH_PRODUCT_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        productError: true,
        data: action.payload,
      };
    default:
      return state;
  }
};
