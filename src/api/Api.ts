import Config from "../config";
import RequestMethods from "./RequestMethods";
import Feedback from "../components/enums/Feedback";

const backendUrl = Config.getBackendUrl();

const request = async (path: string, method: RequestMethods, authtoken: string) => {
  const backendUrl = Config.getBackendUrl();
  const fetchUrl = `${backendUrl}${path}`;

  const response = await fetch(fetchUrl, {
    method: method,
    headers: {
      'Auth-Token': authtoken
    }
  });

  if (response.status === 400 || response.status === 403) {
    throw new Error("Request rejected due to auth-token invalid or missing");
  }

  if (response.status === 401) {
    throw new Error('User is not logged in');
  }

  return response;
};

const requestWithBody = async (path: string, method: RequestMethods, body: any, authtoken: string) => {
  let fetchUrl = `${backendUrl}${path}`;

  if (method === RequestMethods.GET) {
    throw new Error('Request method GET not allowed');
  }

  const response = await fetch(fetchUrl, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Auth-Token': authtoken
    },
    body: JSON.stringify(body)
  });

  if (response.status === 400 || response.status === 403) {
    throw new Error("Request rejected due to auth-token invalid or missing");
  }

  if (response.status === 401) {
    throw new Error('User is not logged in');
  }

  return response;
};

const login = async (base64String: string) => {
  const fetchUrl = `${backendUrl}/login`;

  return await fetch(fetchUrl, {
    method: RequestMethods.GET,
    headers: {
      'Auth-String': base64String
    }
  });
};

const getAuthToken = async (base64String: string) => {
  const fetchUrl = `${backendUrl}/getAuthToken`;

  const response = await fetch(fetchUrl, {
    method: RequestMethods.GET,
    headers: {
      'Auth-String': base64String
    }
  });

  if (response.status === 401) {
    throw new Error('User is not logged in');
  }

  return response;
};

const healthCheck = async () =>
    await request('/healthcheck', RequestMethods.GET, "");

const getDocuments = async (authtoken: string) =>
  await request('/getDocuments', RequestMethods.GET, authtoken);

const addDocument = async (document: {}, authtoken: string) =>
    await requestWithBody('/addDocument', RequestMethods.POST, document, authtoken);

const updateDocument = async (document: {}, authtoken: string) =>
    await requestWithBody('/updateDocument', RequestMethods.PUT, document, authtoken);

const addFeedbackToDocument = async (id:String, feedback: Feedback, authtoken: string) =>
    await request(`/updateDocument/addFeedback/${id}?feedback=${feedback}`, RequestMethods.PUT , authtoken);

const deleteDocument = async (id: string, authtoken: string) =>
    await request(`/deleteDocument?id=${id}`, RequestMethods.DELETE, authtoken);

const Api = {
  login,
  getAuthToken,
  healthCheck,
  getDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
  addFeedbackToDocument,
};

export default Api;
