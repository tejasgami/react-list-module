import * as Types from "../types/users";

const initialState = {
  users: {
    // This object contains all users list
    // this is mainly required in users listing page
    // where we show all users list and loading icon if users are loading
    data: [],
    error: null,
    loading: false
  },
};

export default function(state = initialState, action) {
  console.log("sdaxssss",action.type);
  switch (action.type) {
    // users Actions

    case Types.FETCH_USERS_REQUEST: {
      return {
        ...state,
        users: { data: [], error: null, loading: true }
      };
    }
    case Types.FETCH_USERS_SUCCESS: {
      return {
        ...state,
        users: {
          data: action.payload,
          error: null,
          loading: false
        }
      };
    }
    case Types.FETCH_USERS_ERROR: {
      return {
        ...state,
        users: {
          data: null,
          error: action.payload,
          loading: false
        }
      };
    }
    default:
      return state;
  }
}
