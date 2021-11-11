import React from "react"
// import styles from "../../styles/BodyEditor.module.css"
import "codemirror/lib/codemirror.css"
import "codemirror/theme/material.css"
import "codemirror/mode/javascript/javascript"
import { Controlled } from "react-codemirror2"
import { js as beautify } from "js-beautify"

export interface IPropsEditor {
  value: string
  onChange: any
  language?: string
}

const BodyDisplay = (props: IPropsEditor): JSX.Element => {
  const handleChange = (editor, data, value) => {
    props.onChange(value)
  }

  return (
    <div className="editor-container">
      <h1 className="editor-title">Response Body</h1>
      <Controlled
        onBeforeChange={handleChange}
        value={beautify(props.value, { intend_size: 2 })}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          theme: "material",
          lineNumbers: true,
          readOnly: true,
          mode: {
            name: "javascript",
            json: "true",
          },
        }}
      />
    </div>
  )
}

export default BodyDisplay
