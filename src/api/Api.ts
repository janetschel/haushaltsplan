import Config from "../config";

const request = async (path: string, method: string) => {
  const backendUrl = Config.getBackendUrl();
  const fetchUrl = `${backendUrl}${path}`;

  return await fetch(fetchUrl, {
    method: method,
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }).then(result => result).catch(error => error);
};

const healthCheck = async () => {
  const response = await request('/healthcheck', 'GET');
  return response.text();
};

const Api = {
  healthCheck,
};

export default Api;
