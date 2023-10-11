import React, { useId } from 'react'

const Input = ({
    type = 'text',
    label,
    className,
    ...props


}, ref) => {
    const id = useId()
    return (
        <div className='flex flex-col '>
            { label &&
                <label htmlFor={ id }>{ label }</label>
            }
            <input type={ type } className={ `w-80 border focus:outline-none ${className} ` } id={ id } { ...props } ref={ ref } />

        </div>
    )
}

export default React.forwardRef(Input)




