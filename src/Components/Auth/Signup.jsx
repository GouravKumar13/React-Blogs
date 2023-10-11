import React from 'react'
import { Input } from "../index.js"

const Signup = () => {
    return (
        <form className='w-full flex flex-col items-center justify-center space-y-5 '>
            <div className='border-neutral-600 border p-10'>
                <Input label="details" placeholder="write your details " />
                <Input label="details" placeholder="write your details " />
                <Input label="details" placeholder="write your details " />
                <Input label="details" placeholder="write your details " />

            </div>
        </form>
    )
}

export default Signup
