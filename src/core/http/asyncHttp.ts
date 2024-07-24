import axios from 'axios';

interface Headers {
  Authorization: string;
  accept: string;
}

export default class AsyncHttp {
  constructor() {
    this.httpClient = axios.create({
      timeout: 50000,
    });
  }

  private httpClient;

  public async get(url: string, token: string, params?: object) {
    return await this.request('get', url, token, params);
  }

  public async post(
    url: string,
    token: string,
    params?: object,
    data?: object
  ) {
    return await this.request('post', url, token, params, data);
  }

  public async put(url: string, token: string, params?: object, data?: object) {
    return await this.request('put', url, token, params, data);
  }

  private async request(
    method: string,
    url: string,
    token: string,
    params?: object,
    data?: object
  ) {
    const response = await this.httpClient.request({
      url,
      method,
      headers: this.defaultHeaders(token),
      params: params,
      data: data,
    });
    return response.data;
  }

  private defaultHeaders(token: string): Headers {
    return {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
    };
  }
}
