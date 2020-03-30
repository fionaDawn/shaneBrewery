import * as Constants from '../constants';
import PragmaApi from '../api/Pragmabrewery';
import dotenv from 'dotenv';
dotenv.config();

const baseUrl = process.env.REACT_APP_BREWERYAPI_URL
  ? process.env.REACT_APP_BREWERYAPI_URL
  : 'http://localhost:3000';
const breweryApiUrl = `${baseUrl}/breweryApi`;
const removeContainerLoading = () => ({
  type: Constants.CONTAINER_REMOVE_LOADING
});

const removeContainerSuccess = () => ({
  type: Constants.CONTAINER_REMOVE_SUCCESS
});

const removeContainerFailure = (payload) => ({
  type: Constants.CONTAINER_REMOVE_FAILURE,
  payload
});

export const removeFromDelivery = (id) => (dispatch) => {
  dispatch(removeContainerLoading());
  const thisAPi = new PragmaApi(breweryApiUrl);
  return thisAPi.container
    .delete(id)
    .then((_response) => dispatch(removeContainerSuccess()))
    .catch((_e) =>
      dispatch(
        removeContainerFailure(
          `Something went wrong in deleting container ${id}, please try again.`
        )
      )
    );
};
