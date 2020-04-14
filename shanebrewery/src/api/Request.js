import axios from 'axios';

export default class Request {
  constructor(url) {
    this.baseUrl = url;
  }

  post(endpoint, data) {
    return axios.post(`${this.baseUrl}${endpoint}`, data);
  }

  delete(endpoint) {
    return axios.delete(`${this.baseUrl}${endpoint}`);
  }
}
