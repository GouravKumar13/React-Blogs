import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteBlogService from '../appWrite/BlogsOperations'
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

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
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            width: '20 rem ',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {

            if (result.isConfirmed) {
                const data = appwriteBlogService.deletePost(post.$id).then((status) => {
                    if (status) {
                        appwriteBlogService.deleteFile(post.featuredImage)


                    }
                });

                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                navigate("/");
            }
        })

    };
    const getUrl = (post) => {

        appwriteBlogService.getFilePreview(post.featuredImage)
            .then((res) => {
                setUrl(res.href)

            })



    }


    return post ? (

        <div className="py-8">

            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <img
                    src={ url }
                    alt={ post.title }
                    className="rounded-xl object-contain drop-shadow-lg"
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
                <h1 className="text-2xl uppercase text-neutral-950   font-semibold ">{ post.title }</h1>
            </div>
            <div className="text-lg text-slate-800 ">
                { parse(post.content) }
            </div>

        </div>
    ) : null;
}
