import configureStore from 'redux-mock-store';
import * as Constants from '../../src/constants';
import thunk from 'redux-thunk';

// Actions to be tested
import {
  startDelivery,
  stopDelivery,
  setDeliveryInProgress,
  setDeliveryNOTInProgress
} from '../../src/delivery/DeliveryAction';
import { mock, sampleData } from '../../mocks/mock.config';

const mockClone = mock;

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({});

describe('DeliveryAction', () => {
  beforeEach(() => {
    // Runs before each test in the suite
    store.clearActions();
  });

  describe('startDelivery', () => {
    test('Dispatches the correct action and payload for correct info', () => {
      const expectedActions = [
        {
          type: Constants.DELIVERY_LOADING
        },
        {
          type: Constants.DELIVERY_START_SUCCESS
        }
      ];
      store.dispatch(startDelivery(sampleData.deliveryInfo)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
    test('Dispatches the correct action and payload for blank request body', () => {
      const expectedActions = [
        {
          type: Constants.DELIVERY_LOADING
        },
        {
          type: Constants.DELIVERY_FAILURE,
          payload: 'Request failed with status code 422'
        }
      ];
      store.dispatch(startDelivery({})).catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('stopDelivery', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: Constants.DELIVERY_LOADING
        },
        {
          type: Constants.DELIVERY_STOP_SUCCESS
        }
      ];
      store.dispatch(stopDelivery()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
    test('Dispatches the correct action and payload but api returns errror', () => {
      mockClone.onDelete(`${BASE_API_URL}/breweryTrip`).reply(500);
      const expectedActions = [
        {
          type: Constants.DELIVERY_LOADING
        },
        {
          type: Constants.DELIVERY_FAILURE,
          payload: 'Request failed with status code 500'
        }
      ];
      store.dispatch(stopDelivery()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('setDeliveryInProgress', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: Constants.DELIVERY_PROGRESS,
          payload: true
        }
      ];
      store.dispatch(setDeliveryInProgress());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('setDeliveryNOTInProgress', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: Constants.DELIVERY_PROGRESS,
          payload: false
        }
      ];
      store.dispatch(setDeliveryNOTInProgress());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
