import React from "react"
// import "codemirror/lib/codemirror.css"
// import "codemirror/theme/material.css"
import "codemirror/mode/javascript/javascript"
import { Controlled } from "react-codemirror2"
import "../../styles/BodyEditor.module.css"
// types
import { BodyEditorProps } from "../../types/index"

const BodyEditor = (props: BodyEditorProps): JSX.Element => {
  const handleChange = (editor, data, value) => {
    props.onChange(value)
  }

  return (
    <React.Fragment>
      <h1 className="editor-title">Body editor</h1>
      <div className="editor-container">
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
    </React.Fragment>
  )
}

export default BodyEditor
