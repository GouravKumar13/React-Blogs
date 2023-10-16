import React, { useEffect, useState } from 'react'
import appwriteBlogService from "../appWrite/BlogsOperations"
import PostForm from "../Components/PostForm/PostFrom"
import { useNavigate, useParams } from 'react-router-dom'
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
