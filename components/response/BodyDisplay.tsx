import React from "react"
// import styles from "../../styles/BodyEditor.module.css"
import "codemirror/lib/codemirror.css"
import "codemirror/theme/material.css"
import "codemirror/mode/javascript/javascript"
import { Controlled } from "react-codemirror2"
import { js as beautify } from "js-beautify"
import styles from "../../styles/BodyEditor.module.css"
// types
import { BodyEditorProps } from "../../types/index"

const BodyDisplay = (props: BodyEditorProps): JSX.Element => {
  const handleChange = (editor, data, value) => {
    props.onChange(value)
  }

  return (
    <React.Fragment>
      <h1 className="editor-title">Response Body</h1>
      <div className={styles.editorContainer}>
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
    </React.Fragment>
  )
}

export default BodyDisplay
