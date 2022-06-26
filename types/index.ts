// - custom types

export type KeyVal = {
  key: string
  value: string
}

export interface MobulaRequest {
  _id: string
  reqName: string
  reqMethod: string
  reqUrl: string
  reqHeaders: KeyVal | {}
  reqQueries: KeyVal | {}
  reqBody?: object
  proxy: boolean
  env: KeyVal[]
}

export interface MobulaWorkspace {
  _id?: string
  name: string
  users: string[]
  requests: MobulaRequest[] | []
  openRequests: MobulaRequest[] | []
  selectedRequest?: string
  collections: string[] | []
  env?: MobulaEnv
  environment?: string
}

export interface MobulaCollection {
  _id?: string
  workspace: string
  user: string
  name: string
  requests: MobulaRequest[] | []
}

export interface MobulaEnv {
  _id?: string
  name: string
  user: string
  variables: KeyVal[] | []
}

export interface UrlPreviewProps {
  url: string
  queryParams: object
  env: KeyVal[]
}

export interface BodyEditorProps {
  value: string
  onChange?: any
  language?: string
}
export interface RequestsBrowserProps {
  requests: MobulaRequest[] | []
  selectedRequest: string
}

export interface ResponseStatusBarProps {
  response: {
    status?: number
    statusText?: string
    data?: any
    config?: any
    mobula?: any
    headers?: any
  }
}
