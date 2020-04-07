const getBackendUrl = () =>
    process.env.NODE_ENV === 'production' ? 'https://haushaltsplan-backend.herokuapp.com' : '';

const Config = {
  getBackendUrl,
};

export default Config;
