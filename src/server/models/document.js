const BaseEntry = require('./base-entry');
const Request = require('./request');

class Document extends BaseEntry {
  #requests = [];

  constructor(title = '') {
    super(title);
  }

  get data() {
    return {
      title: this.title,
      description: this.description,
      operationId: this.operationId,
      requests: this.#requests.map((r) => r.data),
    };
  }

  get requests() {
    return this.#requests;
  }

  /**
   * withRequests
   * @param {Request[]} values
   */
  withRequests(values) {
    if (!Array.isArray(values))
      throw new TypeError('Expecting the array of Request objects');

    for (const request of values) {
      if (!(request instanceof Request))
        throw new TypeError('Expecting the array of Request objects');
    }

    this.#requests = values;
  }

  send(index) {
    if (typeof index != 'number')
      throw new Error("index should be of type 'number'");
    if (index >= this.#requests.length || index < 0)
      throw new Error('index out of range');

    this.#requests[index].__send().then((res) => {
      console.log(res.data);
    });
  }
}

module.exports = Document;
