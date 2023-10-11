import React, { useId } from 'react'

const Input = ({
    type = 'text',
    label,
    className,
    ...props


}, ref) => {
    const id = useId()
    return (
        <div className='flex flex-col w-80  gap-1 justify-center '>
            { label &&
                <label htmlFor={ id } className='capitalize'>{ label }</label>
            }
            <input type={ type } className={ ` px-10 rounded-sm border focus:border-blue-500 focus:outline-none ${className} ` } id={ id } { ...props } ref={ ref } />

        </div>
    )
}

export default React.forwardRef(Input)




