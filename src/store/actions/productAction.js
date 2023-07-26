import axios from "axios";
import * as actionTypes from '../constant';

export const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_ALL_PRODUCTS_REQUEST })

        const {data} = await axios(process.env.REACT_APP_BASE_URL + '/api/v1/products',{
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        })
        console.log(data)
        dispatch({ type: actionTypes.GET_ALL_PRODUCTS_SUCCESS, payload: data});
    
    } catch (error) {
      dispatch({
        type: actionTypes.GET_ALL_PRODUCTS_FAIL,
        payload: error.response.data.message
      })
    }
  };