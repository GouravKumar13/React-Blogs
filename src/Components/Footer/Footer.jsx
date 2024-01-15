import React from 'react'
import Input from '../Utils/Input'
import { Link } from 'react-router-dom'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';


const Footer = () => {
    const footerItems = [
        {
            name: "Home",
            URL: "/"
        },

        {
            name: "All Post",
            URL: "/allPost",

        },
        {
            name: "Add Post",
            URL: "/addPost",

        },
        {
            name: "Contact us",
            URL: "/Contact us",

        }, {
            name: "About Me",
            URL: "https://gouravkumar13.vercel.app/",

        },



    ]
    //


    return (
        <footer className='flex flex-col gap-7 justify-center items-center px-10 pt-10 pb-2  bg-slate-100 border-t-[1px] border-slate-100 ' >
            <div className='text-2xl font-semibold capitalize'>
                <h1>Subscribe to our newsletter</h1>
            </div>
            <div className='text-black relative'>
                <Input placeholder="Enter Email address" className="px-2 rounded-md  h-10" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute top-[50%] right-0 p-1 mr-2 transform translate-y-[-50%] w-6 h-6 cursor-pointer">
                    <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                </svg>

            </div>
            <div className='flex gap-10 flex-wrap capitalize text-xl'>{
                footerItems.map((item) => (
                    <Link to={ item.URL } key={ item.name }>
                        <p>{ item.name }</p>
                    </Link>
                ))
            }
            </div>
            <div className='flex gap-5'>
                <Link to="https://www.linkedin.com/in/gouravkumar1312">
                    <LinkedInIcon />
                </Link>
                <Link to="https://github.com/GouravKumar13">
                    <GitHubIcon />
                </Link>
                <Link to="https://twitter.com/gouravk64617039">
                    <TwitterIcon />
                </Link>
            </div>
            <div className='flex gap-5 text-xs text-neutral-400'>
                <p>Terms & Conditions</p>
                <p>Privacy Policy</p>
            </div>

        </footer >
    )
}

export default Footer
