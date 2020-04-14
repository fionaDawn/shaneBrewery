import Request from '../api/Request';

export default class Container extends Request {
  constructor(url) {
    super(url);
    this.endpoint = '/containers';
  }

  delete(id) {
    return super.delete(`${this.endpoint}/${id}`);
  }
}
