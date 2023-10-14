import React from 'react'
import { Editor } from "@tinymce/tinymce-react"
const RTE = ({ name, control, label, defaultValue = "" }, ref) => {
    return (
        <div>
            { label && <label>{ label }</label> }
        </div>
    )
}

export default React.forwardRef(RTE)
