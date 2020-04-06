import Config from "../config";
import RequestMethods from "./RequestMethods";

const backendUrl = Config.getBackendUrl();

const request = async (path: string, authtoken: string) => {
  const backendUrl = Config.getBackendUrl();
  const fetchUrl = `${backendUrl}${path}?token=${authtoken}`;

  const response = await fetch(fetchUrl, {
    method: RequestMethods.GET,
  });

  if (response.status === 400 || response.status === 403) {
    throw new Error("Request rejected due to auth-token invalid or missing");
  }

  return response;
};

const requestWithBody = async (path: string, body: any, authtoken: string) => {
  const fetchUrl = `${backendUrl}${path}?token=${authtoken}`;

  const response = await fetch(fetchUrl, {
    method: RequestMethods.GET,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });

  if (response.status === 400 || response.status === 403) {
    throw new Error("Request rejected due to auth-token invalid or missing");
  }

  return response;
};

const login = async (base64String: string) => {
  const fetchUrl = `${backendUrl}/login?auth=${base64String}`;

  return await fetch(fetchUrl);
};

const getAuthToken = async (base64String: string) => {
  const fetchUrl = `${backendUrl}/getAuthToken?auth=${base64String}`;

  return await fetch(fetchUrl);
};

const healthCheck = async (authtoken: string) =>
    await request('/healthcheck', authtoken);

const getDocuments = async (authtoken: string) =>
  await request('/getDocuments', authtoken);

const addDocument = async (document: {}, authtoken: string) =>
    await requestWithBody('/addDocument', document, authtoken);

const updateDocument = async (document: {}, authtoken: string) =>
    await requestWithBody('/updateDocument', document, authtoken);

const deleteDocument = async (id: string, authtoken: string) =>
    await request(`/deleteDocument?id=${id}`, authtoken);

const Api = {
  login,
  getAuthToken,
  healthCheck,
  getDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
};

export default Api;
