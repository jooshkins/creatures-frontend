const dev = {
  Auth: {
    mandatorySignIn: true,
    region: "us-east-2",
    userPoolId: "us-east-2_KXeJhZQrE" ,
    identityPoolId: "us-east-2:978110fd-c0d4-4d4f-b9ce-e6367799c567",
    userPoolWebClientId: "6mdnkli0enkqk7g8g4jo023arb"
  },
  API: {
    endpoints: [
      {
        name: "dev-scooter-backend-iac",
        endpoint: "https://7thxsnvbc9.execute-api.us-east-2.amazonaws.com/dev",
        region: "us-east-2"
      },
    ]
  }
}
  
// const prod = {
//   Auth: {
//     mandatorySignIn: true,
//     region: "",
//     userPoolId: "" ,
//     identityPoolId: "",
//     userPoolWebClientId: ""
//   },
//   API: {
//     endpoints: [
//       {
//         name: "",
//         endpoint: "",
//         region: ""
//       },
//     ]
//   }
// };
  
// // Default to dev if not set
// const config = process.env.REACT_APP_STAGE === 'prod'
//   ? prod
//   : dev;

const config = dev;

export default {
  // Add common config values here
  ...config
};