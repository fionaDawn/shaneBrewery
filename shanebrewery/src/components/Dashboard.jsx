import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDeliveryInProgress,
  setDeliveryNOTInProgress
} from '../delivery/DeliveryAction';
import { CircularProgress } from '@material-ui/core';
import InputArea from './Input';
import TripView from './Trip';
import styles from './Styles.css';
import dotenv from 'dotenv';
dotenv.config();

const Dashboard = () => {
  const [containers, setContainers] = useState({});
  const [tripStarted, setTripProgress] = useState(false);
  const [listening, setListening] = useState(false);

  const dispatch = useDispatch();

  const delivery = useSelector(state => state.delivery);

  const isTripInProgress =
    delivery.inProgress || Object.keys(containers).length > 0;

  useEffect(() => {
    if (!listening) {
      const baseUrl = process.env.REACT_APP_BREWERYAPI_URL
        ? process.env.REACT_APP_BREWERYAPI_URL
        : 'http://localhost:3000';
      const eventSourceUrl = `${baseUrl}/breweryApi/events`;
      const events = new EventSource(eventSourceUrl);
      events.onmessage = event => {
        const parsedData = JSON.parse(event.data);
        setContainers(parsedData);
      };

      setListening(true);
    }
  }, [listening]);

  useEffect(() => {
    if (Object.keys(containers).length > 0) {
      if (!delivery.inProgress) {
        dispatch(setDeliveryInProgress());
      }
    } else {
      if (delivery.inProgress) {
        dispatch(setDeliveryNOTInProgress());
      }
    }
  }, [containers, delivery.inProgress]);

  const closeDialog = () => {
    setTripProgress(!tripStarted);
  };

  if (delivery.loading)
    return (
      <div>
        <CircularProgress color="primary" />
      </div>
    );

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        {isTripInProgress ? (
          <TripView error={delivery.error} containers={containers} />
        ) : (
          <InputArea
            error={delivery.error}
            alert={tripStarted && !isTripInProgress}
            closeAlert={closeDialog}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
