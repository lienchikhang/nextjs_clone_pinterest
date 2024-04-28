'use client';

import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import axios from 'axios';
import Image from 'next/image';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import useSWR from 'swr';
import SendIcon from '@mui/icons-material/Send';
import { Context } from '@/redux/context';

const fetcher = (url: string) => axios.get(url);

interface User {
    full_name: string,
    avatar: string,
}

interface Prop {
    imgId: number,
}

const UserAvatar: React.FC<Prop> = ({ imgId }) => {

    const [onComment, setOnComment] = useState(false);
    const [comment, setComment] = useState('');
    const [payload, dispatch] = useContext(Context);

    const handleComment = (e: ChangeEvent<HTMLInputElement>) => {
        setComment(e.currentTarget.value);
        if (e.currentTarget.value === '') {
            setOnComment(false);
        } else {
            setOnComment(true);
        }
    }

    const handleSend = () => {
        axios.post(`/api/image/add-comment/${imgId}`, {
            content: comment,
        })
            .then((res) => console.log({ res }))
            .catch((err) => console.log({ err }))
    }

    return (
        <div className='user__comment'>
            {payload.user.avatar
                ? <Image defaultValue={''} className='img' width={40} height={40} src={payload.user.avatar} alt='avatar' />
                : <Avatar className='img' sx={{ bgcolor: deepOrange[500] }}>{payload.user.full_name[0]}</Avatar>
            }
            <div className='user__input'>
                <input type="text" placeholder='Add a comment' onChange={handleComment} value={comment} />
                <SendIcon className={`${onComment && 'active'}`} onClick={handleSend} />
            </div>
        </div>
    )
}

export default UserAvatar
