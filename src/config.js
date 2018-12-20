const dev = {
    apiGateway: {
      REGION: process.env.REACT_APP_DEV_API_GATEWAY_REGION,
      URL: process.env.REACT_APP_DEV_API_GATEWAY_URL
    },
    cognito: {
      REGION: process.env.REACT_APP_DEV_COGNITO_REGION,
      USER_POOL_ID: process.env.REACT_APP_DEV_COGNITO_USER_POOL_ID,
      APP_CLIENT_ID: process.env.REACT_APP_DEV_COGNITO_APP_CLIENT_ID,
      IDENTITY_POOL_ID: process.env.REACT_APP_DEV_COGNITO_IDENTITY_POOL_ID
    }
  };
  
  const prod = {
    apiGateway: {
        REGION: process.env.REACT_APP_PRO_API_GATEWAY_REGION,
        URL: process.env.REACT_APP_PRO_API_GATEWAY_URL
      },
      cognito: {
        REGION: process.env.REACT_APP_PRO_COGNITO_REGION,
        USER_POOL_ID: process.env.REACT_APP_PRO_COGNITO_USER_POOL_ID,
        APP_CLIENT_ID: process.env.REACT_APP_PRO_COGNITO_APP_CLIENT_ID,
        IDENTITY_POOL_ID: process.env.REACT_APP_PRO_COGNITO_IDENTITY_POOL_ID
      }
    };
  
  // Default to dev if not set
  const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev;
  
  export default {
    // Add common config values here

    ...config
  };