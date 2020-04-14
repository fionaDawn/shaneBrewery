import { combineReducers } from 'redux';
import deliveryReducer from './delivery/DeliveryReducer';
import containerReducer from './container/ContainerReducer';

const rootReducer = combineReducers({
  delivery: deliveryReducer,
  container: containerReducer
});

export default rootReducer;
