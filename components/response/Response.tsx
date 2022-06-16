import React from 'react'
import ResponseHeaders from './ResponseHeaders'
import BodyDisplay from './BodyDisplay'
import ResponseStatusBar from './ResponseStatusBar'

const Response = ({ response }) => {
  return (
    <div>
      <h4>Response</h4>
      <main>
        <ResponseStatusBar response={response} />
        <h5>Response Body</h5>
        {response.data.originalResponseHeaders && response.data.originalData ? (
          <BodyDisplay value={JSON.stringify(response.data.originalData)} />
        ) : (
          <BodyDisplay value={JSON.stringify(response.data)} />
        )}
        <ResponseHeaders response={response} />
      </main>
    </div>
  )
}

export default Response
