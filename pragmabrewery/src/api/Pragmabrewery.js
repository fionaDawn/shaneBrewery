import DeliveryApi from '../delivery/DeliveryApi';
import ContainerApi from '../container/ContainerApi';
import dotenv from 'dotenv';
dotenv.config();

export default class Pragmabrewery {
  constructor(url) {
    const envUrl = process.env.REACT_APP_BREWERYTRIP_URL
      ? process.env.REACT_APP_BREWERYTRIP_URL
      : 'http://localhost:5000';
    this.baseUrl = url ? url : envUrl;
    this.delivery = new DeliveryApi(this.baseUrl);
    this.container = new ContainerApi(this.baseUrl);
  }
}
