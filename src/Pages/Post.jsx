import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteBlogService from '../appwrite/BlogsOperations'
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post () {
    const [post, setPost] = useState(null);
    const [url, setUrl] = useState(null)
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {

        if (slug) {
            appwriteBlogService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                    getUrl(post)
                        ;
                }
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteBlogService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteBlogService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };
    const getUrl = (post) => {

        appwriteBlogService.getFilePreview(post.featuredImage)
            .then((res) => {
                setUrl(res.href)

            })



    }

    console.log("render")
    return post ? (

        <div className="py-8">

            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <img
                    src={ url }
                    alt={ post.title }
                    className="rounded-xl"
                />

                { isAuthor && (
                    <div className="absolute right-6 top-14 text-white">
                        <Link to={ `/edit-post/${post.$id}` }>
                            <button className="mr-3 px-2 rounded bg-green-500">
                                Edit
                            </button>
                        </Link>
                        <button className="bg-red-500 px-2 rounded" onClick={ deletePost }>
                            Delete
                        </button>
                    </div>
                ) }
            </div>
            <div className="w-full mb-6">
                <h1 className="text-2xl  font-semibold ">{ post.title }</h1>
            </div>
            <div className="browser-css">
                { parse(post.content) }
            </div>

        </div>
    ) : null;
}
