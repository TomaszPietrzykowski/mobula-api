import React, { useEffect, useState } from 'react'
import isEmptyObj from '../../utils/isEmptyObj'

interface IProps {
  url: string
  queryParams: object
}

const UrlPreview = ({ url, queryParams }: IProps): JSX.Element => {
  const [outputString, setOutputString] = useState<string>(url)

  // TODO --- parse ENV variables from url

  useEffect(() => {
    if (!isEmptyObj(queryParams)) {
      const arr: string[] = []
      Object.entries(queryParams).forEach((el) => {
        arr.push(`${el[0]}=${el[1]}`)
      })
      const queryStr: string = `?${arr.join('&')}`
      setOutputString(`${url}${queryStr}`)
    } else {
      setOutputString(url)
    }
  }, [url, queryParams])
  return <div style={{ padding: '1.3rem' }}>{outputString}</div>
}

export default UrlPreview
