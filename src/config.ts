const getBackendUrl = () =>
    process.env.NODE_ENV === 'production' ? 'https://haushaltsplan-backend.herokuapp.com' : 'localhost:8080';

const Config = {
  getBackendUrl,
};

export default Config;
