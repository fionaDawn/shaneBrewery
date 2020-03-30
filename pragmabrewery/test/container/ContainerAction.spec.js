import configureStore from 'redux-mock-store';
import * as Constants from '../../src/constants';
import thunk from 'redux-thunk';

// Actions to be tested
import { removeFromDelivery } from '../../src/container/ContainerAction';
import { sampleData } from '../../mocks/mock.config';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({});

describe('ContainerAction', () => {
  beforeEach(() => {
    // Runs before each test in the suite
    store.clearActions();
  });

  describe('removeFromDelivery', () => {
    test('Dispatches the correct action and payload for correct info', () => {
      const expectedActions = [
        {
          type: Constants.CONTAINER_REMOVE_LOADING
        },
        {
          type: Constants.CONTAINER_REMOVE_SUCCESS
        }
      ];
      store
        .dispatch(removeFromDelivery(sampleData.deliveryInfo.id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
    test('Dispatches the correct action and payload for non-exisiting container id', () => {
      const expectedActions = [
        {
          type: Constants.CONTAINER_REMOVE_LOADING
        },
        {
          type: Constants.CONTAINER_REMOVE_FAILURE,
          payload: 'Request failed with status code 422'
        }
      ];
      store.dispatch(removeFromDelivery('2')).catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
