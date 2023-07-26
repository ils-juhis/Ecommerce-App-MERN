import * as actionTypes from '../constant'

export const productReducer = (state = {products: []}, action) => {
  
    switch (action.type) {
        case actionTypes.GET_ALL_PRODUCTS_REQUEST:
        return {
          loading: true,
          products: []
        };

        case actionTypes.GET_ALL_PRODUCTS_SUCCESS:
        return {
            loading: false,
            products: action.payload.products,
            productsCount: action.payload.productsCount
        };

        case actionTypes.GET_ALL_PRODUCTS_FAIL:
            return {
              loading: false,
              error: action.payload 
            };
    
        case actionTypes.CLEAR_ERROR: 
            return {
                ...state,
                error: null
            }

        default: 
        return state;
    }
}

