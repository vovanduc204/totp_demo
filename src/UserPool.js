import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  // UserPoolId: 'ap-southeast-1_JhNjE2mw3',
  // ClientId: '2es1fijpmm6vmpjqnq731fs8rv'
  UserPoolId: 'ap-southeast-1_3nFDDoRuz', // ducvo
  ClientId: '6vjhtc4topnecjmued5iokejiq' 
};

export default new CognitoUserPool(poolData);