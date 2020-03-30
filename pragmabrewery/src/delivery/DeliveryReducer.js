import * as Constants from '../constants';

const initialState = {
  loading: false,
  error: '',
  inProgress: false,
};

const deliveryReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.DELIVERY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Constants.DELIVERY_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case Constants.DELIVERY_START_SUCCESS:
      return {
        loading: false,
        error: '',
        inProgress: true,
      };
    case Constants.DELIVERY_STOP_SUCCESS:
      return {
        loading: false,
        error: '',
        inProgress: false,
      };
    case Constants.DELIVERY_PROGRESS:
      return {
        ...state,
        inProgress: action.payload,
      };
    default:
      return state;
  }
};

export default deliveryReducer;
