import AsyncHttp from './asyncHttp';

class ContextAsyncHttp {
  private instance;

  getAsyncHttpClient(): AsyncHttp {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new AsyncHttp();
    return this.instance;
  }
}

const contextAsyncHttp = new ContextAsyncHttp();
export default contextAsyncHttp;
