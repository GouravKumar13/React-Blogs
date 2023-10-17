import React from 'react'

const Select = ({ label, options = [], className = "" }, ref) => {
    return (
        <select className={ ` p-1 ${className}` } ref={ ref }>
            { options.map(item => <option key={ item }>{ item }</option>) }

        </select>
    )
}

export default React.forwardRef(Select)
