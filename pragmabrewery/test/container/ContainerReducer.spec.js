import containerReducer from '../../src/container/ContainerReducer';
import * as Constants from '../../src/constants';
const initialState = {
  loading: false,
  error: ''
};
describe('Container reducer', () => {
  it('should return the user initial state', () => {
    expect(containerReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CONTAINER_REMOVE_FAILURE', () => {
    expect(
      containerReducer(undefined, {
        type: Constants.CONTAINER_REMOVE_FAILURE,
        payload:
          '"Something went wrong in deleting container 1, please try again.'
      })
    ).toEqual({
      loading: false,
      error: '"Something went wrong in deleting container 1, please try again.'
    });
  });

  it('should handle CONTAINER_REMOVE_LOADING', () => {
    expect(
      containerReducer(undefined, {
        type: Constants.CONTAINER_REMOVE_LOADING
      })
    ).toEqual({
      loading: true,
      error: ''
    });
  });

  it('should handle CONTAINER_REMOVE_SUCCESS', () => {
    expect(
      containerReducer(undefined, {
        type: Constants.CONTAINER_REMOVE_SUCCESS
      })
    ).toEqual({
      loading: false,
      error: ''
    });
  });
});
