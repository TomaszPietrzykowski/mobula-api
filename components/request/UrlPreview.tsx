import React, { useEffect, useState } from "react"
import isEmptyObj from "../../utils/isEmptyObj"
import parseEnv from "../../utils/parseEnv"
import { UrlPreviewProps } from "../../types/index"

const UrlPreview = ({
  url,
  queryParams,
  env,
}: UrlPreviewProps): JSX.Element => {
  const [outputString, setOutputString] = useState<string>(url)

  // TODO --- parse ENV variables from url

  useEffect(() => {
    if (!isEmptyObj(queryParams)) {
      const arr: string[] = []
      Object.entries(queryParams).forEach((el) => {
        arr.push(`${el[0]}=${el[1]}`)
      })
      const queryStr: string = `?${arr.join("&")}`
      setOutputString(`${url}${queryStr}`)
    } else {
      setOutputString(url)
    }
  }, [url, queryParams])

  // jsx
  return (
    <div style={{ padding: "1.3rem", color: "lightblue" }}>
      {parseEnv(outputString, env)}
    </div>
  )
}

export default UrlPreview
