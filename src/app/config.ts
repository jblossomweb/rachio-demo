import coreConfig from 'core/config';

export default {
  ...coreConfig,
  title: process.env.REACT_APP_TITLE,
  description: process.env.REACT_APP_DESCRIPTION,
  services: {
    /* import service env vars here */
    legacy: {
      url: process.env.REACT_APP_LEGACY_SERVICE_URL,
      apiKey: process.env.REACT_APP_LEGACY_SERVICE_API_KEY,
    },
    rachio: {
      url: process.env.REACT_APP_RACHIO_SERVICE_URL,
      apiKey: process.env.REACT_APP_RACHIO_SERVICE_API_KEY,
    },
  },
};
