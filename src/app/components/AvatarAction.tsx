'use client';

import React, { useContext, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Context } from '@/redux/context';
import cookies from 'js-cookie';

interface User {
    full_name: string,
    avatar: string,
}

const AvatarAction = () => {

    // const [payload, dispatch] = useContext(Context);
    const [fullName, setFullname] = useState('');
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        setFullname(cookies.get('full_name') as string)
        setAvatar(cookies.get('avatar') as string)
    }, [])

    // console.log('payload in AvatarAction', payload)
    const navigate = useRouter();

    const handleClick = () => {
        navigate.push(`/home/${fullName}`);
    }

    return (
        avatar
            ? <Image onClick={handleClick} className='img' width={40} height={40} src={avatar} alt='avatar' />
            : <Avatar
                onClick={handleClick}
                sx={{ bgcolor: deepOrange[500], width: '40px', height: '40px', cursor: 'pointer' }}
            >
                {fullName[0]}
            </Avatar>
    )
}

export default AvatarAction