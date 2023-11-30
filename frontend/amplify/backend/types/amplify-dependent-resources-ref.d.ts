export type AmplifyDependentResourcesAttributes = {
  "api": {
    "Dyslexicon": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "auth": {
    "Dyslexicon": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    }
  },
  "predictions": {
    "ocrText": {
      "format": "string",
      "region": "string"
    },
    "speechText": {
      "language": "string",
      "region": "string",
      "voice": "string"
    }
  },
  "storage": {
    "s3dyslexiconstorage": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}