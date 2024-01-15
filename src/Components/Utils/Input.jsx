import React, { useId } from 'react'

const Input = ({
    type = 'text',
    label,
    className,
    ...props


}, ref) => {
    const id = useId()
    return (
        <div className=' space-x-3 '>
            { label &&
                <label htmlFor={ id } className="group-focus-within:text[#8c7569] text-[16px] uppercase pl-[4px] font-semibold text-[#8c7569] transition-[0.3s]">{ label }</label>
            }
            <input
                type={ type }
                className={ ` rounded-sm outline-none p-1 pl-1  text-sm ${className} ` }
                id={ id }
                { ...props }
                ref={ ref } />

        </div>
    )
}

export default React.forwardRef(Input)




