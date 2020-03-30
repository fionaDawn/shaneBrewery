import * as Constants from '../constants';
import PragmaApi from '../api/Pragmabrewery';

const deliveryLoading = () => ({ type: Constants.DELIVERY_LOADING });

const deliveryStartSuccess = () => ({ type: Constants.DELIVERY_START_SUCCESS });

const deliveryFailure = (error) => ({
  type: Constants.DELIVERY_FAILURE,
  payload: error
});

export const startDelivery = (info) => (dispatch) => {
  dispatch(deliveryLoading());
  const Api = new PragmaApi();
  return Api.delivery
    .start(info)
    .then((_response) => dispatch(deliveryStartSuccess()))
    .catch((e) => dispatch(deliveryFailure(e.message)));
};

const deliveryStopSuccess = () => ({ type: Constants.DELIVERY_STOP_SUCCESS });

export const stopDelivery = () => (dispatch) => {
  dispatch(deliveryLoading());
  const Api = new PragmaApi();
  return Api.delivery
    .delete()
    .then((_response) => dispatch(deliveryStopSuccess()))
    .catch((e) => dispatch(deliveryFailure(e.message)));
};

const setDeliveryProgress = (payload) => ({
  type: Constants.DELIVERY_PROGRESS,
  payload
});

export const setDeliveryInProgress = () => (dispatch) =>
  dispatch(setDeliveryProgress(true));

export const setDeliveryNOTInProgress = () => (dispatch) =>
  dispatch(setDeliveryProgress(false));
