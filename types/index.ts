// -

export type KeyVal = {
  key: string
  value: string
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
  requests: any[]
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
