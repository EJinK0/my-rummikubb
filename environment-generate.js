const awsParamStore = require('aws-param-store');
const fs = require('fs');
require('dotenv').config();

const targetPath = './.env';
const _awsOptions = {
    accessKeyId: process.env.REACT_APP_AWS_SSM_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SSM_SECRET_KEY,
    region: process.env.REACT_APP_AWS_SSM_REGION || 'ap-northeast-2'
};

const _awsSsmParameter = `my-rummi-${process.env.AWS_ENV}-env`;
let awsKeyValueParameter;
const _awsKeyValueParameter = awsParamStore.getParameterSync(_awsSsmParameter, _awsOptions);
if (_awsKeyValueParameter && _awsKeyValueParameter.Value) {
    try {
        awsKeyValueParameter = JSON.parse(_awsKeyValueParameter.Value);
    } catch (error) {
        throw console.error(error, 'PARSING ERROR - WEPIN WEB ENV');
    }
}

// set parameter store keys to env
let envConfigFile = ``;

Object.keys(awsKeyValueParameter).forEach((key) => {
    envConfigFile += `${key}=${awsKeyValueParameter[key]}\n`;
});

fs.writeFile(targetPath, envConfigFile, function (err) {
    if (err) {
        throw console.error(err);
    } else {
        console.log(envConfigFile);
        console.log(`.env generated correctly at ${targetPath} \n`);
    }
});
