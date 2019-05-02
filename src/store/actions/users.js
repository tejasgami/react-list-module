import * as Types from "../types/users";
import { get, map } from "lodash";
import Api from "../../utils/api";
import * as Const from "../../utils/constants";
import queryString from "query-string";

export const getUsers = (state) => async dispatch => {
  let errorStr = "";
  try {
    const params = {
      page: state,
      results: 20,
      seed:"test"
    };

    dispatch({ type: Types.FETCH_USERS_REQUEST });
    let response = await Api.doCall(`${Const.GET_USERS()}?${queryString.stringify(params)}`, "GET");
    if (response.status === 200 || response.status === 201) {
      if (!response.data.error) {
        dispatch({
          type: Types.FETCH_USERS_SUCCESS,
          payload: response.data
        });
        return;
      }
      errorStr = response.data.error;
    }
  } catch (error) {
      console.log("error",  error.toString())
    errorStr = error.toString();
  }
  dispatch({
    type: Types.FETCH_USERS_ERROR,
    payload: errorStr
  });
};
