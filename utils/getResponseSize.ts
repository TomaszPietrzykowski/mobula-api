import prettyBytes from 'pretty-bytes'

const getResponseSize = (response) => {
  let length = 0
  if (response.data.originalData && response.data.originalHeaders) {
    length =
      JSON.stringify(response.data.originalHeaders).length +
      JSON.stringify(response.data.originalData).length
  } else {
    length =
      JSON.stringify(response.headers).length +
      JSON.stringify(response.data).length
  }
  return prettyBytes(length)
}

export default getResponseSize
