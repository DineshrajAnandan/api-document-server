const axios = require('axios');
const HttpsProxyAgent = require('https-proxy-agent');

function axiosClient() {
  const webProxy = process.env.WEB_PROXY;
  if (!webProxy) return axios;

  const httpsAgent = new HttpsProxyAgent(webProxy);

  return axios.create({
    httpsAgent,
  });
}

module.exports = axiosClient;
