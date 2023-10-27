import React, { useEffect, useState } from 'react'
import appwriteBlogService from '../appwrite/BlogsOperations'
import { Link } from 'react-router-dom'

function PostCard ({ $id, title, featuredImage, }) {

    const [url, setUrl] = useState(null)
    useEffect(() => {
        appwriteBlogService.getFilePreview(featuredImage).then((res) => setUrl(res.href))
    }, [])

    return (
        <Link to={ `/post/${$id}` }>
            <div className='w-[313px] max-h-[300px] h-[300px] border hover:border-blue-500  rounded-xl  '>
                <div className=' cursor-pointer h-[80%] '>
                    <img src={ url } alt={ title }
                        className='rounded-xl object-cover h-full w-full p-2' />

                </div>
                <h2
                    className='text-lg text-white text-center  rounded-b-xl bg-blue-400 w-full h-[20%]  font-semibold '
                >{ title }</h2>
            </div>
        </Link>
    )
}


export default PostCard