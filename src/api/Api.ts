import Config from "../config";

const request = async (path: string, method: string) => {
  const backendUrl = Config.getBackendUrl();
  const fetchUrl = `${backendUrl}${path}`;

  return await fetch(fetchUrl, {
    method: method,
    headers: {
      'Origin': process.env.NODE_ENV === 'production' ? 'https://haushaltsplan-backend.herokuapp.com/' : 'null'
    }
  });
};

const healthCheck = async () => await request('/healthcheck', 'GET');

const Api = {
  healthCheck,
};

export default Api;
