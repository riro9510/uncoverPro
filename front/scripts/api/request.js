import { api } from './api.js';

class Request {
  constructor(endpoint, data) {
    this.endpoint = endpoint;
    this.data = data;
  }

  async send() {
    throw new Error('Method "send()" must be implemented');
  }

  async handleRequest(axiosCall) {
    try {
      const response = await axiosCall();
      return response.data; 
    } catch (error) {
      console.error(`Error in request to ${this.endpoint}:`, error);
      throw error;
    }
  }
}
export { Request };