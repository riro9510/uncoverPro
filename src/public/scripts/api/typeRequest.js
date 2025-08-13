import { Request } from "./request.js";
import { api } from './api.js'; 

class GetRequest extends Request {
  constructor(endpoint,data) {
    super(endpoint, data);
  }

  async send() {
    return this.handleRequest(() => api.get(this.endpoint, this.data));
  }
}


class PostRequest extends Request {
  constructor(endpoint, data) {
    super(endpoint, data);
  }

  async send() {
    return this.handleRequest(() => api.post(this.endpoint, this.data));
  }
}

export { GetRequest, PostRequest };