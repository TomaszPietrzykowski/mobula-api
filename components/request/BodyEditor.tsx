import React from "react"
// import styles from "../../styles/BodyEditor.module.css"
import "codemirror/lib/codemirror.css"
import "codemirror/theme/material.css"
import "codemirror/mode/javascript/javascript"
import { Controlled } from "react-codemirror2"
// types
import { BodyEditorProps } from "../../types/index"

const BodyEditor = (props: BodyEditorProps): JSX.Element => {
  const handleChange = (editor, data, value) => {
    props.onChange(value)
  }

  return (
    <div className="editor-container">
      <h1 className="editor-title">Body editor</h1>
      <Controlled
        onBeforeChange={handleChange}
        value={props.value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          theme: "material",
          lineNumbers: true,
          mode: {
            name: "javascript",
            json: "true",
          },
        }}
      />
    </div>
  )
}

export default BodyEditor
