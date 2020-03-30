import Config from "../config";

const request = async (path: string, method: string) => {
  const backendUrl = Config.getBackendUrl();
  const fetchUrl = `${backendUrl}${path}`;

  return await fetch(fetchUrl, {
    method: method,
  });
};

const healthCheck = async () =>
    await request('/healthcheck', 'GET');

const getDocuments = async () =>
  await request('/getDocuments', 'GET');

const Api = {
  healthCheck,
  getDocuments,
};

export default Api;
