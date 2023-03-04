/* eslint-disable */

export enum FETCH_METHODS {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

/* eslint-enable */
type HTTPMethod = (url: string, options?: Options) => Promise<unknown>

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

class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => {
    const {data} = options;

    if (data) {
      url = url + queryStringify(data);
    }

    return this.request(url, {...options, method: FETCH_METHODS.GET}, options.timeout);
  };

  post = (url: string, options: Options) => {
    return this.request(url, {...options, method: FETCH_METHODS.POST}, options.timeout);
  };

  put = (url: string, options: Options) => {
    return this.request(url, {...options, method: FETCH_METHODS.PUT}, options.timeout);
  };

  delete = (url: string, options: Options) => {
    return this.request(url, {...options, method: FETCH_METHODS.DELETE}, options.timeout);
  };

  request = (url: string, options: Options, timeout = 5000) => {
    let {method, data, headers = {}} = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(
        method!, url);

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function() {
        resolve(xhr);
      }

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    })
  };
}
