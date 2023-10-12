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
                <label htmlFor={ id } className="group-focus-within:text[#8c7569] text-[16px] uppercase pl-[4px] font-semibold text-[#8c7569] transition-[0.3s]">{ label }</label>
            }
            <input type={ type } className={ ` outline-none border-none pl-[4px] text-sm ${className} ` } id={ id } { ...props } ref={ ref } />

        </div>
    )
}

export default React.forwardRef(Input)




