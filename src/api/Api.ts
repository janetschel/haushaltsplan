import Config from "../config";

const request = async (path: string, method: string) => {
  const backendUrl = Config.getBackendUrl();
  const fetchUrl = `${backendUrl}${path}`;

  return await fetch(fetchUrl, {
    method: method,
    headers: {
      'X-Requested-With': 'https://haushaltsplan-backend.herokuapp.com/'
    }
  });
};

const healthCheck = async () => await request('/healthcheck', 'GET');

const Api = {
  healthCheck,
};

export default Api;
