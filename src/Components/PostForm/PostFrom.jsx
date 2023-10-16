import React from 'react';
import { useFormik } from 'formik';
import { Input, Select, } from '../index'; // Import your custom components
import appwriteBlogService from '../../appWrite/BlogsOperations';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { data } from 'autoprefixer';

export default function PostForm ({ post }) {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    console.log(userData)

    const initialValue = {
        title: post?.title || '',
        slug: post?.$id || '',
        content: post?.content || '',
        status: post?.status || 'active',
        image: null, // Initialize image as null
    }

    const formik = useFormik({
        initialValues: initialValue,
        onSubmit: async (values, action) => {



            const file = await appwriteBlogService.uploadFile(values.image)

            if (file) {

                const fileId = file.$id
                values.image = fileId

                const dbPost = await appwriteBlogService.createPost({ ...values, userId: userData.$id })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }



            // action.resetForm()
        },
    });

    const slugTransform = (value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/^[a-zA-Z\d\s]+/g, '-')
                .replace(/\s/g, '-');
        }
        return '';
    };


    return (
        <form onSubmit={ formik.handleSubmit } className="flex flex-wrap border border-neutral-950 drop-shadow-md h-[80vh] my-11 p-3 ">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 h-10"
                    { ...formik.getFieldProps('title') }
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 h-10"
                    { ...formik.getFieldProps('slug') }
                    onInput={ (e) => {
                        formik.setFieldValue('slug', slugTransform(e.currentTarget.value), true);
                    } }
                />
                <div>
                    <label htmlFor='content' className='inline-block mb-1 pl-1'>Content:</label>
                    <textarea
                        id='content'
                        name='content'
                        rows="10" // You can adjust the number of rows as needed
                        className="w-full border rounded p-2 focus:outline-blue-400"
                        { ...formik.getFieldProps('content') }
                    />
                    {/* <RTE label="Content :" name="content" control={ formik.getFieldProps('content') } /> */ }
                </div>
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    onChange={ (event) => formik.setFieldValue('image', event.target.files[0]) }
                />
                { post && (
                    <div className="w-full mb-4">
                        <img src={ appwriteBlogService.getFilePreview(post.featuredImage) } alt={ post.title } className="rounded-lg" />
                    </div>
                ) }
                <Select
                    options={ ['active', 'inactive'] }
                    label="Status"
                    className="mb-4"
                    { ...formik.getFieldProps('status') }
                />
                <button type="submit" className={ `${post ? 'bg-green-500' : 'bg-blue-400'} text-white px-3 py-1 rounded-sm` }>
                    { post ? 'Update' : 'Submit' }
                </button>
            </div>
        </form>
    );
}
