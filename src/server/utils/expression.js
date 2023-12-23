const applyExpressionToObject = (object, expression) => {
  let parts = expression.split('.');
  let result = object;
  for (const part of parts) {
    result = isNaN(+part) ? result[part] : result[+part];
  }
  return result;
};

module.exports = { applyExpressionToObject };
