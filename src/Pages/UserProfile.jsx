import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import LogoutBtn from '../Components/Header/LogoutBtn'

import { bear, cat, chicken, dogB, dog, giraffe, gorilla, kitty, panda, rabbit, seaLion, tiger, wildBores } from "../assets/avatar/index"
import authService from '../appWrite/auth'

const UserProfile = () => {
    const userData = useSelector((state) => state.auth.userData)
    const [editName, setEditName] = React.useState(userData.name)

    const [avatarMenu, setAvatarMenu] = React.useState(false)

    const [avatar, setAvatar] = React.useState(localStorage.getItem("avatar"))


    localStorage.setItem('avatar', avatar)


    console.log(userData.$id)
    const avatars = [bear, cat, chicken, dogB, dog, giraffe, gorilla, kitty, panda, rabbit, seaLion, tiger, wildBores]

    const userAvatar = localStorage.getItem('avatar')
    console.log(userAvatar)

    return (
        <>
            <div className='flex justify-around mx-auto h-[200px] bg-white rounded-lg w-2/3 items-center'>
                <div className='flex items-center gap-2'>
                    <img src={ avatar ? userAvatar : localStorage.getItem('defaultAvatar') } alt="" className='relative h-28' />
                    <svg onClick={ () => setAvatarMenu(!avatarMenu) } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-black absolute translate-x-20 -translate-y-12 hover:scale-110">
                        <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                    </svg>
                    <input onChange={ (e) => (setEditName(e.target.value)) } className=' uppercase text-2xl  w-[300px] font-bold text-orange-500'


                        value={ editName } />
                    <button >save</button>
                </div>

                <LogoutBtn />
            </div >
            { avatarMenu &&
                <div className=' flex flex-wrap gap-3 justify-self-start items-center rounded-md  bg-neutral-950 translate-x-[120%] translate-y-[32%] w-[400px] h-fit absolute '>
                    {
                        avatars.map((item, index) => {
                            console.log(item)
                            return (
                                <div className='flex' key={ item }>
                                    <img onClick={ () => (setAvatar(item)) } src={ item } alt="" className='w-16 h-16 p-1' />
                                </div>
                            )
                        })
                    }

                </div>
            }
            <div className='flex  gap-3'>
                <h1 className='text-2xl font-semibold'>Email: <span className='text-gray-500'>{ userData.email }</span></h1>
                { userData.emailVerification ? (<h1>verified</h1>) : (<h1>not verified</h1>) }
            </div>
        </>
    )
}

export default UserProfile
