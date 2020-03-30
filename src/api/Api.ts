import Config from "../config";

const request = async (path: string, method: string) => {
  const backendUrl = Config.getBackendUrl();
  const fetchUrl = `${backendUrl}${path}`;

  return await fetch(fetchUrl, {
    method: method,
  });
};

const requestWithBody = async (path: string, method: string, body: any) => {
  const backendUrl = Config.getBackendUrl();
  const fetchUrl = `${backendUrl}${path}`;

  return await fetch(fetchUrl, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
};

const healthCheck = async () =>
    await request('/healthcheck', 'GET');

const getDocuments = async () =>
  await request('/getDocuments', 'GET');

const addDocument = async (document: {}) =>
    await requestWithBody('/addDocument', 'POST', document);

const updateDocument = async (document: {}) =>
    await requestWithBody('/updateDocument', 'PUT', document);

const deleteDocument = async (id: string) =>
    await request(`/deleteDocument?id=${id}`, 'DELETE');

const Api = {
  healthCheck,
  getDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
};

export default Api;
