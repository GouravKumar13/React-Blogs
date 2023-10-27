import React, { useEffect, useState } from 'react'
import PostForm from "../Components/PostForm/PostFrom"
import { useNavigate, useParams } from 'react-router-dom'
import appwriteBlogService from '../appwrite/BlogsOperations'

const EditPost = () => {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()
    useEffect(() => {

        if (slug) {
            appwriteBlogService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }
            })
        } else {
            navigate("/")
        }

    }, [slug, navigate])
    return post ? (
        <PostForm post={ post } />
    ) : null
}

export default EditPost
