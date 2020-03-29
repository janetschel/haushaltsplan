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
  });
};

const healthCheck = async () => await request('/healthcheck', 'GET');

const Api = {
  healthCheck,
};

export default Api;
