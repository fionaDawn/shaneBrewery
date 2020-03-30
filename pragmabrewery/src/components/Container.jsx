import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Styles.css';

import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import { removeFromDelivery } from '../container/ContainerAction';
import { Check as DeleteIcon } from '@material-ui/icons';

const Container = (props) => {
  const { value } = props;
  const { id, name, temperature, tempInRange } = value;
  const dispatch = useDispatch();

  const handleRemove = (e, id) => {
    e.preventDefault();
    dispatch(removeFromDelivery(id));
  };

  return (
    <Grid item md={4} xs={12} className={styles.content}>
      <Card className={styles.container}>
        <CardContent className={tempInRange ? styles.cardOk : styles.cardError}>
          <Typography variant="h5" gutterBottom align="center">
            {tempInRange
              ? 'Temperature is in range'
              : 'Temperature out of range!!!'}
          </Typography>

          <Typography gutterBottom align="center">
            {`Container No ${id}: ${name}`}
          </Typography>

          <Typography variant="h3" gutterBottom align="center">
            {temperature} &deg;C
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            aria-label="remove container"
            onClick={(e) => handleRemove(e, id)}>
            <DeleteIcon />
            Mark as Delivered
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

Container.propTypes = {
  error: PropTypes.string,
  value: PropTypes.object
};

export default Container;
