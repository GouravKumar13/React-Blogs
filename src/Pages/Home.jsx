import React, { useEffect, useState } from 'react'
import appwriteBlogService from '../appWrite/BlogsOperations'
import { PostCard } from '../Components/index'
import { useSelector } from 'react-redux'
import LoginImage from "../assets/undraw_login_re_4vu2.svg"
import noPostImage from "../assets/noPostimage.svg"

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


    console.log(posts)
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
            <div className="w-full  flex justify-center my-36">


                <div className="object-contain w-[400px] h-[400px]">
                    <img src={ noPostImage } alt="No post image" />

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