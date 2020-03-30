const getBackendUrl = () =>
    process.env.NODE_ENV === 'production' ?
        'https://cors-anywhere.herokuapp.com/https://haushaltsplan-backend.herokuapp.com' : '';

const Config = {
  getBackendUrl,
};

export default Config;
