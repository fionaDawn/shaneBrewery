import deliveryReducer from '../../src/delivery/DeliveryReducer';
import * as Constants from '../../src/constants';
const initialState = {
  loading: false,
  error: '',
  inProgress: false,
};
describe('Delivery reducer', () => {
  it('should return the user initial state', () => {
    expect(deliveryReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle DELIVERY_FAILURE', () => {
    expect(
      deliveryReducer(undefined, {
        type: Constants.DELIVERY_FAILURE,
        payload: 'Failed!',
      })
    ).toEqual({
      loading: false,
      error: 'Failed!',
      inProgress: false,
    });
  });

  it('should handle DELIVERY_LOADING', () => {
    expect(
      deliveryReducer(undefined, {
        type: Constants.DELIVERY_LOADING,
      })
    ).toEqual({
      loading: true,
      error: '',
      inProgress: false,
    });
  });

  it('should handle DELIVERY_START_SUCCESS', () => {
    expect(
      deliveryReducer(undefined, {
        type: Constants.DELIVERY_START_SUCCESS,
      })
    ).toEqual({
      loading: false,
      error: '',
      inProgress: true,
    });
  });

  it('should handle DELIVERY_START_SUCCESS', () => {
    expect(
      deliveryReducer(undefined, {
        type: Constants.DELIVERY_STOP_SUCCESS,
      })
    ).toEqual(initialState);
  });

  it('should handle DELIVERY_PROGRESS', () => {
    expect(
      deliveryReducer(undefined, {
        type: Constants.DELIVERY_PROGRESS,
        payload: true,
      })
    ).toEqual({
      loading: false,
      error: '',
      inProgress: true,
    });
  });
});
