const BaseEntry = require('./base-entry');
const getClient = require('../services/axios/client');
const { VALID_VERBS } = require('../constants/verbs');
const { stringIsAValidUrl } = require('../utils/string');

class Request extends BaseEntry {
  #url;
  #headers = {};
  #data;
  #method = 'GET';
  #preRequisite;

  constructor(url = undefined) {
    if (url == undefined) return;
    super(url);
    this.withUrl(url);
  }

  get data() {
    return {
      title: this.title,
      description: this.description,
      url: this.#url,
      headers: this.#headers,
      data: this.#data,
      method: this.#method,
      operationId: this.operationId,
      preRequisite: this.#preRequisite,
    };
  }

  /**
   * withUrl
   * @param {string} value
   */
  withUrl(value) {
    if (typeof value != 'string') throw new TypeError('URL should be a string');
    if (!stringIsAValidUrl(value)) throw new Error(`Invalid URL : ${value}`);
    this.#url = value;
    // if (!this.title) this.withTitle(value);
    return this;
  }

  /**
   * withPreRequisite - value should be the operationId of another request
   * @param {string} value
   */
  withPreRequisite(placeholder, operationId, valueExpression) {
    if (
      typeof placeholder != 'string' ||
      typeof operationId != 'string' ||
      typeof valueExpression != 'string'
    )
      throw new TypeError(
        'PreRequisite  placeholderValue, operationIdValue and valueExpression should be a string'
      );
    this.#preRequisite = {
      placeholder,
      operationId,
      valueExpression,
    };
    return this;
  }

  /**
   * withHeaders
   * @param {{}} value
   */
  withHeaders(value) {
    if (typeof value != 'object')
      throw new TypeError('header value should be an object');
    if (Array.isArray(value))
      throw new TypeError("array is not assignable to the property 'header'");
    this.#headers = value;
    return this;
  }

  /**
   * withBody
   * @param {any} value
   */
  withBody(value) {
    this.#data = value;
    return this;
  }

  /**
   * withMethod
   * @param {'GET' | 'POST' | 'PUT' | 'DELETE'} value
   */
  withMethod(value) {
    if (typeof value != 'string')
      throw new Error('method property is expecting a value of string type');
    const valueUpper = value.toUpperCase();

    if (!VALID_VERBS.includes(valueUpper))
      throw new Error(
        `the value for method property is expected to be one among the values ${VALID_VERBS.join(
          ', '
        )}`
      );

    this.#method = value;
  }

  __send(modifiedHeaders = undefined) {
    const config = {
      method: this.#method.toLowerCase(),
      url: this.#url,
      data: this.#data,
      headers: modifiedHeaders ? modifiedHeaders : this.#headers,
    };

    const client = getClient();

    return client(config);
  }
}

class GetRequest extends Request {
  constructor(url) {
    super(url);
    super.withMethod('GET');
  }
  withMethod(value) {
    throw new Error("'withMethod' is not callable for the class 'GetRequest'");
  }
}

class PostRequest extends Request {
  constructor(url) {
    super(url);
    super.withMethod('POST');
  }
  withMethod(value) {
    throw new Error("'withMethod' is not callable for the class 'PostRequest'");
  }
}

class PutRequest extends Request {
  constructor(url) {
    super(url);
    super.withMethod('PUT');
  }
  withMethod(value) {
    throw new Error("'withMethod' is not callable for the class 'PutRequest'");
  }
}

class DeleteRequest extends Request {
  constructor(url) {
    super(url);
    super.withMethod('DELETE');
  }
  withMethod(value) {
    throw new Error(
      "'withMethod' is not callable for the class 'DeleteRequest'"
    );
  }
}

module.exports = Request;
module.exports.GetRequest = GetRequest;
module.exports.PostRequest = PostRequest;
module.exports.PutRequest = PutRequest;
module.exports.DeleteRequest = DeleteRequest;
