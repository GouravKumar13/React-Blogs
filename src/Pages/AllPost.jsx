import React, { useState, useEffect } from 'react'
import { PostCard } from '../Components/index'
import appwriteBlogService from '../appwrite/BlogsOperations'

function AllPosts () {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteBlogService.getAllPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    return (
        <div className='w-full py-8'>

            <div className='flex flex-wrap'>
                { posts.map((post) => (
                    <div key={ post.$id } className='p-2 w-1/4'>
                        <PostCard { ...post } />
                    </div>
                )) }
            </div>

        </div>
    )
}

export default AllPosts