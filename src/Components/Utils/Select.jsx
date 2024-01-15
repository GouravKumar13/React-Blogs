import React from 'react'
import { useId } from 'react'

const Select = ({ label, options = [], className = "", ...props }, ref) => {
    const id = useId()
    return (
        <div className='space-x-4'>
            { label && <label className='text-[#8c7569] font-semibold' htmlFor={ id }>{ label }</label> }
            <select className={ ` p-1 rounded-sm border  ${className}` } id={ id } ref={ ref } { ...props }>
                { options?.map(item => <option key={ item } value={ item }>{ item }</option>) }

            </select>
        </div>
    )
}

export default React.forwardRef(Select)
