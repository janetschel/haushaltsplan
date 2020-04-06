import Config from "../config";

const backendUrl = Config.getBackendUrl();

const request = async (path: string, authtoken: string) => {
  const backendUrl = Config.getBackendUrl();
  const fetchUrl = `${backendUrl}${path}?token=${authtoken}`;

  const response = await fetch(fetchUrl);

  if (response.status === 400 || response.status === 403) {
    throw new Error("Request rejected due to auth-token invalid or missing");
  }

  return response;
};

const requestWithBody = async (path: string, body: any, authtoken: string) => {
  let fetchUrl = `${backendUrl}${path}?token=${authtoken}`;

  for (const eachEntry in body){
    if (body.hasOwnProperty(eachEntry)) {
      fetchUrl += `&${eachEntry}=${body[eachEntry]}`;
    }
  }

  const response = await fetch(fetchUrl);

  if (response.status === 400 || response.status === 403) {
    throw new Error("Request rejected due to auth-token invalid or missing");
  }

  return response;
};

const requestWithId = async (path: string, id: string, authtoken: string) => {
  const backendUrl = Config.getBackendUrl();
  const fetchUrl = `${backendUrl}${path}?token=${authtoken}&id=${id}`;

  const response = await fetch(fetchUrl);

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
    await requestWithId(`/deleteDocument`, id, authtoken);

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
