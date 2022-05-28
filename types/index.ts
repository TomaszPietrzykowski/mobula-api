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
  name: string
  requests: MobulaRequest[] | []
  openRequests: MobulaRequest[] | []
  selectedRequest: string
  env: Env
}

export interface Env {
  id: string
  name: string
  user: string
  variables: KeyVal[]
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
