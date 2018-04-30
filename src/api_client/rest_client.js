/**
 * /* REST-API client module
 *
 * @format
 */

import HttpStatus from 'http-status-codes';
// import RequestError from './request_error.js';

const httpMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};
const contentTypes = {
  JSON: 'application/json',
};

const baseHeaders = {
  Accept: contentTypes.JSON,
  'Content-Type': contentTypes.JSON,
};

class RestClient {
  constructor({apiOrigin, getToken}) {
    this.apiOrigin = apiOrigin;
    this.getToken = getToken;
    this.acceptLanguage = null;
  }

  getFullPath(target) {
    return `${this.apiOrigin}/${target}`;
  }

  setAcceptLanguage(lang) {
    this.acceptLanguage = lang;
  }

  getHeaders({headers, withToken, isFormData}) {
    const resultHeaders = {
      ...baseHeaders,
      ...headers,
    };

    const token = withToken ? this.getToken() : null;
    if (token) {
      resultHeaders.authorization = `Token ${token}`;
    }
    if (this.acceptLanguage) {
      resultHeaders['Accept-Language'] = this.acceptLanguage;
    }

    if (isFormData) {
      // In case we used formData, we do not need to set Content-Type.
      // It will be set automatically by browser on fetch call.
      delete resultHeaders['Content-Type'];
      delete resultHeaders['Accept'];
    }

    return resultHeaders;
  }

  request({
    url,
    method = httpMethods.GET,
    body = null,
    isFormData = false,
    headers = {},
    withToken = true,
  }) {
    const fullPath = this.getFullPath(url);
    const requestHeaders = this.getHeaders({headers, withToken, isFormData});
    const params = {
      method,
      headers: requestHeaders,
    };
    if (body) {
      params.body = isFormData ? body : JSON.stringify(body);
    }
    return fetch(fullPath, params).then(
      response => {
        if (response.headers.get('Content-Type') !== contentTypes.JSON) {
          // Not a JSON Content
          return response;
        } else if (
          response.status === HttpStatus.NO_CONTENT || // 204
          (response.status === HttpStatus.OK && // 200
            response.headers.get('Content-Length') === '0')
        ) {
          // OK, but no JSON content
          return Promise.resolve();
        }
        return response.json().then(responseBody => {
          // JSON content
          if (!response.ok) {
            // status is not 200+
            let message;
            const data = {
              status: response.status,
            };
            if (response.status === HttpStatus.BAD_REQUEST) {
              // 400
              if (responseBody.nonFieldErrors) {
                // global error
                [message] = responseBody.nonFieldErrors; // always 1 elem
              } else {
                // fields error
                const fields = {};
                Object.entries(responseBody).forEach(oneEntry => {
                  const fieldName = oneEntry[0];
                  const fieldMessage = oneEntry[1][0]; // always 1 elem
                  fields[fieldName] = fieldMessage;
                });
                data.fields = fields;
                message = Object.values(data.fields).join(' - '); // concatenation
              }
            } else {
              message =
                responseBody.detail ||
                response.statusText ||
                `${response.status} error`; // global error
            }
            //throw new RequestError(message, data);
            console.log('REQUEST ERROR! ' + message)
          }
          return responseBody; // response is ok
        });
      },
      error => {
        // network/communication error
        const {message} = error;
        const data = {}; // no available info
        // throw new RequestError(message, data);
        console.log('REQUEST ERROR! ' + message)
      },
    );
  }
}

RestClient.httpMethods = httpMethods; // static

export default RestClient;
