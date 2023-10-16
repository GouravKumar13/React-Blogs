import React from 'react'

const Select = ({ label, options = [], className = "" }) => {
    return (
        <select className={ ` p-1 ${className}` }>
            { options.map(item => <option key={ item }>{ item }</option>) }

        </select>
    )
}

export default Select
