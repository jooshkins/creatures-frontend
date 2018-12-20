import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'
import registerServiceWorker from './registerServiceWorker';
import Amplify from "aws-amplify";
import './index.css';

Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: process.env.REACT_APP_COGNITO_REGION,
      userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
      identityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
      userPoolWebClientId: process.env.REACT_APP_COGNITO_APP_CLIENT_ID
    },
    API: {
      endpoints: [
        {
          name: process.env.REACT_APP_API_GATEWAY_NAME,
          endpoint: process.env.REACT_APP_API_GATEWAY_URL,
          region: process.env.REACT_APP_API_GATEWAY_REGION
        },
      ]
    }
  });

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
