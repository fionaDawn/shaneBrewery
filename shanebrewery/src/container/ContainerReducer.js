import * as Constants from '../constants';

const initialState = {
  loading: false,
  error: ''
};

const containerReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.CONTAINER_REMOVE_LOADING:
      return {
        loading: true,
        error: ''
      };
    case Constants.CONTAINER_REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: ''
      };
    case Constants.CONTAINER_REMOVE_FAILURE:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default containerReducer;
