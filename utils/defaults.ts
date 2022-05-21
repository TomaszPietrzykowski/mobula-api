import { MobulaRequest, MobulaWorkspace, KeyVal, Env } from "../types/index"

export const defaultRequest: MobulaRequest = {
  reqUrl: "{{URL}}/api/public/v1/co2/{{END}}",
  reqQueries: {},
  reqHeaders: {},
  reqMethod: "GET",
  reqBody: {},
  proxy: true,
  env: [
    { key: "URL", value: "https://climatemonitor.info" },
    { key: "END", value: "latest" },
  ],
}
export const testRequest: MobulaRequest = {
  reqUrl: "{{URL}}/api/public/v1/ch4/{{END}}",
  reqQueries: {},
  reqHeaders: {},
  reqMethod: "GET",
  reqBody: {},
  proxy: true,
  env: [
    { key: "URL", value: "https://climatemonitor.info" },
    { key: "END", value: "monthly" },
  ],
}
export const exemplaryRequest: MobulaRequest = {
  reqUrl: "{{URL}}/api/public/v1/co2/annual_ml",
  reqQueries: {},
  reqHeaders: {},
  reqMethod: "GET",
  reqBody: {},
  proxy: true,
  env: [
    { key: "URL", value: "https://climatemonitor.info" },
    { key: "END", value: "latest" },
  ],
}

export const defaultEnv: Env = {
  id: "db_uuid",
  name: "PRODUCTION_CM",
  user: "user_id",
  variables: [
    { key: "URL", value: "https://climatemonitor.info" },
    { key: "END", value: "latest" },
    { key: "END1", value: "monthly" },
    { key: "DATA", value: "co2" },
  ],
}

export const defaultWorkspace: MobulaWorkspace = {
  name: "New Workspace",
  requests: [defaultRequest, testRequest, exemplaryRequest],
  openRequests: [defaultRequest, testRequest],
  env: defaultEnv,
}
