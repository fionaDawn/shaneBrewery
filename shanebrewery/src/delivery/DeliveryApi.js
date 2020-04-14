import Request from '../api/Request';

export default class Delivery extends Request {
  constructor(url) {
    super(url);
    this.endpoint = '/breweryTrip';
  }

  start(params) {
    return super.post(this.endpoint, params);
  }

  delete() {
    return super.delete(this.endpoint);
  }
}
