const isContainerValid = (container) =>
  container && Object.keys(container).length > 0;

const isBeerValid = (beer) => beer && Object.keys(beer).length > 0;

const isBeerTempInRange = (beer, temperature) =>
  beer.minTemp <= temperature && temperature <= beer.maxTemp;

module.exports = {
  isContainerValid,
  isBeerValid,
  isBeerTempInRange,
};
