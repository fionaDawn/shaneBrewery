import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Styles.css';
import Beers from '../config/beer.config.json';
import { startDelivery } from '../delivery/DeliveryAction';
import { Alert } from '@material-ui/lab';

import {
  Card,
  CardContent,
  CardActions,
  Grid,
  TextField,
  Button,
  CardHeader
} from '@material-ui/core';

const Input = (props) => {
  const [inputState, setInputState] = useState({});
  const dipatch = useDispatch();

  const handleChange = (event) => {
    event.persist();
    const value = event.target.value;
    if (value)
      setInputState((inputState) => ({
        ...inputState,
        [event.target.name]: event.target.value.replace(/[^0-9]/g, '')
      }));
    else delete inputState[event.target.name];
  };

  const handleClick = (event) => {
    event.preventDefault();

    console.log({ info: inputState });
    props.closeAlert();

    dipatch(startDelivery({ info: inputState }));
  };
  const { alert, closeAlert, error } = props;

  return (
    <Card className={styles.cardInputRoot}>
      {error ? <Alert severity="error">{error}</Alert> : null}
      {alert ? (
        <Alert severity="success" onClose={closeAlert}>
          Trip has been ended!
        </Alert>
      ) : null}
      <CardHeader
        title="Welcome to ShaneBrewery!"
        subheader="Enter number of containers per beer"
      />
      <CardContent>
        <Grid container spacing={3}>
          {Object.entries(Beers).map(([id, beer]) => (
            <Grid item key={beer.name} md={4} xs={12}>
              <TextField
                name={id}
                type="number"
                // fullWidth
                label={beer.name}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true
                }}
                variant="outlined"
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          className={styles.alignright}
          color="primary"
          onClick={handleClick}
          variant="contained">
          Generate
        </Button>
      </CardActions>
    </Card>
  );
};

Input.propTypes = {
  alert: PropTypes.bool,
  closeAlert: PropTypes.func,
  error: PropTypes.string
};

export default Input;
