export enum FETCH_METHODS {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

type HTTPMethod = (path: string, options?: Record<string, any>, timeout?: number) => Promise<unknown>

const queryStringify = (data: object): string => {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }
  const query = Object.entries(data).map(item => `${item[0]}=${item[1]}`).join('&');
  return `?${query}`
}

type Options = {
  data?: any,
  timeout?: number,
  method?: string,
  headers?: Record<string, string>
}

export default class HTTPTransport {
  private readonly url: string;
  static BASE_API_URL = 'https://ya-praktikum.tech/api/v2';

  constructor(endpoint: string) {
    this.url = HTTPTransport.BASE_API_URL + endpoint;
  };

  get: HTTPMethod = (path, options = {}) => {
    const data = options.data;
    let url = this.url + path;

    if (data) {
      url = url + queryStringify(data);
    }

    return this.request(url, {...options, method: FETCH_METHODS.GET});
  }

  post: HTTPMethod = (path: string, options: Options) => {
    let url = this.url + path;
    return this.request(url, {
      ...options,
      method: FETCH_METHODS.POST
      });
  };

  put: HTTPMethod = (path: string, options: Options) => {
    let url = this.url + path;

    return this.request(url,
      {...options, method: FETCH_METHODS.PUT});
  };

  delete: HTTPMethod = (path: string, options: Options) => {
    let url = this.url + path;

    return this.request(url, {...options, method: FETCH_METHODS.DELETE});
  };

  request = (url: string, options: Options) => {
    let {method, data, headers = {}} = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === FETCH_METHODS.GET;
      const isFormData = data instanceof FormData;

      xhr.open(method!, url);

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function() {
        resolve(xhr);
      }

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        if(isFormData) {
          xhr.send(data)
        } else {
          console.log(data)
          xhr.send(JSON.stringify(data))
        }
      }
    })
  };
}
