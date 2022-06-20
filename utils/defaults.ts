import {
  MobulaRequest,
  MobulaWorkspace,
  KeyVal,
  MobulaEnv,
} from '../types/index'

export const defaultRequest: MobulaRequest = {
  _id: '1',
  reqName: 'testowy 1',
  reqUrl: '{{URL}}/api/public/v1/co2/{{END}}',
  reqQueries: {},
  reqHeaders: {},
  reqMethod: 'GET',
  reqBody: {},
  proxy: true,
  env: [
    { key: 'URL', value: 'https://climatemonitor.info' },
    { key: 'END', value: 'latest' },
  ],
}
export const testRequest: MobulaRequest = {
  _id: '2',
  reqName: 'testowy 2',
  reqUrl: '{{URL}}/api/public/v1/ch4/{{END}}',
  reqQueries: {},
  reqHeaders: {},
  reqMethod: 'GET',
  reqBody: {},
  proxy: true,
  env: [
    { key: 'URL', value: 'https://climatemonitor.info' },
    { key: 'END', value: 'monthly' },
  ],
}
export const exemplaryRequest: MobulaRequest = {
  _id: '3',
  reqName: 'testowy 3',
  reqUrl: '{{URL}}/api/public/v1/co2/annual_ml',
  reqQueries: {},
  reqHeaders: {},
  reqMethod: 'GET',
  reqBody: {},
  proxy: true,
  env: [
    { key: 'URL', value: 'https://climatemonitor.info' },
    { key: 'END', value: 'latest' },
  ],
}

export const defaultEnv: MobulaEnv = {
  _id: 'db_uuid',
  name: 'PRODUCTION_CM',
  user: 'user_id',
  variables: [
    { key: 'URL', value: 'https://climatemonitor.info' },
    { key: 'END', value: 'latest' },
    { key: 'END1', value: 'monthly' },
    { key: 'DATA', value: 'co2' },
  ],
}

export const defaultWorkspace: MobulaWorkspace = {
  name: 'New Workspace',
  requests: [defaultRequest, testRequest, exemplaryRequest],
  openRequests: [defaultRequest, testRequest],
  selectedRequest: defaultRequest._id,
  env: defaultEnv,
}

// --------------- SANDBOX --------

export const todos = [
  {
    reqName: "Get all TODO's",
    reqUrl: 'https://jsonplaceholder.typicode.com/todos',
    reqMethod: 'GET',
    reqHeaders: {},
    reqQueries: {},
    proxy: true,
    reqBody: {},
  },
  {
    reqName: 'Get TODO by ID',
    reqUrl: 'https://jsonplaceholder.typicode.com/todos/1',
    reqMethod: 'GET',
    reqHeaders: {},
    reqQueries: {},
    proxy: true,
    reqBody: {},
  },
  {
    reqName: 'Create new TODO',
    reqUrl: 'https://jsonplaceholder.typicode.com/todos',
    reqMethod: 'POST',
    reqHeaders: {
      'Content-Type': 'application/json',
    },
    reqQueries: {},
    proxy: true,
    reqBody: {
      userId: 1,
      title: 'Walk the dog',
      completed: false,
    },
  },
]
