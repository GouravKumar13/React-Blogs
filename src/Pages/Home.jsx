import React, { useEffect, useState } from 'react'
import appwriteBlogService from '../appWrite/BlogsOperations'
import { PostCard } from '../Components/index'
import { useSelector } from 'react-redux'
import LoginImage from "../assets/undraw_login_re_4vu2.svg"

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
    }, [authStatus])



    if (!authStatus) {
        return (

            <div className="flex flex-col my-4 flex-wrap items-center justify-center">
                <div className="">
                    <img src={ LoginImage } className='object-contain p-10' alt='login' />
                </div>
                <h1 className="text-xl font-semibold uppercase hover:text-gray-500">
                    Login to read posts
                </h1>


            </div>


        )
    }

    return (posts.length === 0) ?
        (
            <div className="w-full py-8 mt-4 text-center">

                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            No post available to read
                        </h1>

                    </div>
                </div>

            </div>
        )
        : (
            <div className='w-full py-8'>

                <div className='flex flex-wrap'>
                    { posts.map((post) => {

                        return (

                            <div key={ post.$id } className='p-2 w-1/4'>
                                <PostCard { ...post } />
                            </div>
                        )
                    }) }
                </div>

            </div>
        )
}

export default Home