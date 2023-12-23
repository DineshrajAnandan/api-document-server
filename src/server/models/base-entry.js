class BaseEntry {
  #title = '';
  #description = '';
  #operationId;

  get title() {
    return this.#title;
  }

  get description() {
    return this.#description;
  }

  get operationId() {
    return this.#operationId;
  }

  constructor(title = '') {
    this.withTitle(title);
  }

  /**
   * withTitle
   * @param {string} value
   */
  withTitle(value) {
    if (typeof value != 'string')
      throw new TypeError("expecting a string value for the property 'title'");
    this.#title = value;
    return this;
  }

  /**
   * withDescription
   * @param {string} value
   */
  withDescription(value) {
    if (typeof value != 'string')
      throw new TypeError(
        "expecting a string value for the property 'description'"
      );
    this.#description = value;
    return this;
  }

  /**
   * withOperationId
   * @param {string} value
   */
  withOperationId(value) {
    if (!value) throw new Error('Operation Id is expected');
    if (typeof value != 'string')
      throw new TypeError('OperationId should be a string');
    this.#operationId = value;
    return this;
  }
}

module.exports = BaseEntry;
