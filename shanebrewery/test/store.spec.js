import store from '../src/store';
import deliveryReducer from '../src/delivery/DeliveryReducer';

describe('store creates empty store', () => {
  it('should create an empty store', () => {
    expect(store.getState().delivery).toEqual(deliveryReducer(undefined, {}));
  });
});
