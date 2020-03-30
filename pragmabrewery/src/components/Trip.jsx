import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Styles.css';
import { stopDelivery } from '../delivery/DeliveryAction';
import { Alert } from '@material-ui/lab';

import { Card, Grid, Button, CardHeader } from '@material-ui/core';
import Container from './Container';

const Input = (props) => {
  const { containers, error } = props;
  const dipatch = useDispatch();
  const containerState = useSelector((state) => state.container);

  const handleClick = (event) => {
    event.preventDefault();
    dipatch(stopDelivery());
  };

  const issue = error
    ? error
    : containerState.error
    ? containerState.error
    : '';

  return (
    <Card className={styles.cardTripRoot}>
      {issue ? <Alert severity="error">{issue}</Alert> : null}
      <CardHeader
        action={
          <Button
            className={styles.alignright}
            color="primary"
            onClick={handleClick}
            variant="contained">
            Finish Trip
          </Button>
        }
      />
      <Grid container spacing={3}>
        {Object.entries(containers).map(([_id, container]) => {
          console.log(container);
          return <Container key={container.id} value={container} />;
        })}
      </Grid>
    </Card>
  );
};

Input.propTypes = {
  containers: PropTypes.object
};

export default Input;
