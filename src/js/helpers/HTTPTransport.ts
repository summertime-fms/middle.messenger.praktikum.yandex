/* eslint-disable */

export enum FETCH_METHODS {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

/* eslint-enable */


const queryStringify = (data: object): string => {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }
  const query = Object.entries(data).map(item => `${item[0]}=${item[1]}`).join('&');
  return `?${query}`
}

type Options = {
  url: string,
  data?: any,
  timeout?: number,
  method?: string,
  headers?: Record<string, string>
}

class HTTPTransport {
  get = (url: string, options: Options) => {
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
      const isGet = method === FETCH_METHODS.GET;

      if (method === FETCH_METHODS.GET && data) {
        url = url + data;
      }

      xhr.open(
        method!,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

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
