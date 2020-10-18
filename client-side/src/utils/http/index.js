import AuthHelper from './../helpers/authHelper';
import { trackPromise } from 'react-promise-tracker';
const server = "http://localhost:8080/api";
const METHOD_GET = 'GET';
const METHOD_POST = 'POST';
const METHOD_PUT = 'PUT';
const METHOD_DELETE = 'DELETE';

class Http {
  static async get(url, params, headers) {
    return await trackPromise(Http.fetchWrapper(url, params, null, headers, METHOD_GET));
  }

  static async post(url, data) {
    return await trackPromise(Http.fetchWrapper(url, null, data, null, METHOD_POST));
  }

  static async put(url, data, params, headers) {
    return await trackPromise(Http.fetchWrapper(url, params, data, headers, METHOD_PUT));
  }

  static async delete(url, data, params, headers) {
    return await trackPromise(Http.fetchWrapper(url, params, data, headers, METHOD_DELETE));
  }

  static setToken(token) {
    Http.token = token;
  }

  static async fetchWrapper(url, params, data, headers, method) {
    const options = {
      method,
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': AuthHelper.getAccessToken() ? AuthHelper.getAccessToken() : null,
        ...headers,
      },
      params: params
    };

    if (method === METHOD_POST && data) {
      options.body = JSON.stringify(data);
    }

    return fetch(server + url, options)
      .then(response => {
        if (response.status !== 200) {
          return response.json().then(res => {
            return {
              error: {
                ...res,
                status: response.status
              }
            };
          });
        }
        return response.json();
      })
      .catch((error) => {
        return new Promise(resolve => resolve({error}));
      });

  }
}

export default Http;
