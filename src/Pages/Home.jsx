import React, { useEffect, useState } from 'react'
import appwriteBlogService from '../appwrite/BlogsOperations'
import { PostCard } from '../Components/index'
import { useSelector } from 'react-redux'

function Home () {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector((store) => store.auth.userData)
    useEffect(() => {
        if (authStatus) {
            appwriteBlogService.getAllPosts().then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
        }
    }, [])
    console.log(posts)
    return (posts.length === 0) ?
        (
            <div className="w-full py-8 mt-4 text-center">

                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to read posts
                        </h1>
                        <div>
                            <h3>Guest user </h3>
                            <p><span className='text-blue-500 font-medium capitalize '>email:</span> mvp@gmail.com</p>
                            <p><span className='text-blue-500 font-medium capitalize '>password:</span> 1234567890</p>
                        </div>
                    </div>
                </div>

            </div>
        )
        : (
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

export default Home