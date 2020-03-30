const getBackendUrl = () =>
    process.env.NODE_ENV === 'production' ?
        'https://secret-ocean-49799.herokuapp.com/https://haushaltsplan-backend.herokuapp.com' : '';

const Config = {
  getBackendUrl,
};

export default Config;
