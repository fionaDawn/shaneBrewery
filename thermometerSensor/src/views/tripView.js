const fail = (res) => res.status(500).send('Server error');
const resp = (res, r) => res.status(r.status).send(r.statusText);
const success = (res) => res.status(201).send('Success');
const successNoResponse = (res) => res.status(204).send('Success');
module.exports = {
  fail,
  resp,
  success,
  successNoResponse,
};
