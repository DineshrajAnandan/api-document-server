const prepareSuccessResult = (response, fromPreRequisite = false) => {
  return {
    status: response.status || 200,
    statusText: response.statusText || 'Ok',
    headers: response.headers,
    data: response.data,
    fromPreRequisite,
  };
};

const prepareErrorResult = (err, fromPreRequisite = false) => {
  return {
    status: err.response?.status || 500,
    statusText: err.response?.statusText,
    data: err.response?.data,
    headers: err.response?.headers,
    fromPreRequisite,
  };
};

module.exports = { prepareErrorResult, prepareSuccessResult };
