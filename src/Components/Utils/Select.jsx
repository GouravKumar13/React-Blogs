import React from 'react'
import { useId } from 'react'

const Select = ({ label, options = [], className = "" }, ref) => {
    const id = useId()
    return (
        <select className={ ` p-1 ${className}` } id={ id } ref={ ref }>
            { options.map(item => <option key={ item } value={ item }>{ item }</option>) }

        </select>
    )
}

export default React.forwardRef(Select)
