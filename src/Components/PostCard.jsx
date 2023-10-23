import React, { useEffect, useState } from 'react'
import appwriteBlogService from '../appwrite/BlogsOperations'
import { Link } from 'react-router-dom'

function PostCard ({ $id, title, featuredImage }) {
    const [url, setUrl] = useState(null)
    useEffect(() => {
        appwriteBlogService.getFilePreview(featuredImage).then((res) => setUrl(res.href))
    }, [])

    return (
        <Link to={ `/post/${$id}` }>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={ url } alt={ title }
                        className='rounded-xl' />

                </div>
                <h2
                    className='text-xl font-bold'
                >{ title }</h2>
            </div>
        </Link>
    )
}


export default PostCard