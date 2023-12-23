const _ = require('lodash');
const {
  prepareErrorResult,
  prepareSuccessResult,
} = require('../../helpers/request-response-helper');
const { getModifiedHeaders } = require('../../helpers/request-item-helper');

const executeRequestItem = async (requestObject, preRequisiteObject) => {
  let modifiedHeaders = undefined;

  if (preRequisiteObject) {
    try {
      const response = await preRequisiteObject.__send();
      modifiedHeaders = getModifiedHeaders(requestObject, response.data);
    } catch (err) {
      return prepareErrorResult(err, true);
    }
  }

  try {
    const response = await requestObject.__send(modifiedHeaders);
    return prepareSuccessResult(response);
  } catch (error) {
    return prepareErrorResult(error);
  }
};

module.exports = { executeRequestItem };
