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
                appwriteBlogService.deletePost(post.$id).then((status) => {
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
    console.log(localStorage.getItem("avatar"))
    return post ? (

        <div className="py-8 z-0 w-full flex flex-col items-center ">
            <div className=" m-4 w-full ml-[50%]  ">
                <div className="flex flex-col  relative space-y-2 ">
                    <h1 className="text-2xl uppercase  font-semibold ">{ post.title }</h1>
                    <div className="w-1/2 flex justify-between">
                        <Link to="/userProfile">
                            <div className="flex w-fit space-x-2 group">
                                <img src={ localStorage.getItem("avatar") ? localStorage.getItem("avatar") : localStorage.getItem("defaultAvatar") } alt="" className="w-6 h-6 group-hover:scale-110 transition-all ease-in-out" />
                                <p className="uppercase group-hover:text-black font-bold text-slate-600">{ userData.name }</p>
                            </div>
                        </Link>
                        <span className="text-white bg-red-400 capitalize px-3 rounded-sm">{ post.genre }</span>
                    </div>
                </div>
                { isAuthor && (
                    <div className="absolute my-4 text-white">
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


            <div className=" flex w-1/2    rounded-md m-10">
                <img
                    src={ url }
                    alt={ post.title }
                    className="rounded-md h-1/2 w-full shadow-lg   shadow-black"
                />


            </div>

            <div className=" w-1/2 text-slate-800 ">
                { parse(post.content) }
            </div>


        </div>
    ) : null;
}
