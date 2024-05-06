'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { deepOrange } from '@mui/material/colors';
import { Avatar, Skeleton, Typography } from '@mui/material';

interface User {
    full_name: string,
    avatar: string,
}

const UserInfo = () => {

    const [user, setUser] = useState<User>();

    useEffect(() => {
        axios.get('/api/user/me')
            .then((res) => setUser(res.data.content))
            .catch((err) => console.log('err', err))
    }, [])

    return (
        <div className='userinfo__wrapper'>
            {user?.avatar ? <Image className='img' defaultValue={''} src={user?.avatar} width={100} height={100} alt='avatar' />
                : <Avatar className='img' sx={{ bgcolor: deepOrange[500], width: '100px', height: '100px', cursor: 'pointer' }}>{user?.full_name[0]}</Avatar>
            }
            {user?.full_name ?
                <h2 className='user__name'>{user?.full_name}</h2> :
                <Typography className='user__name' component="div" key={'h3'} variant={'h3'}>
                    <Skeleton className='user__name w-36' />
                </Typography>}
            <button className='user__edit'>Edit profile</button>
        </div>
    )
}

export default UserInfo