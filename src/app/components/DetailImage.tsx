'use client';

import axios from 'axios';
import Image from 'next/image';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import ShareButton from './ShareButton';
import { Avatar, Collapse, List, ListItem } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CommentItem from './CommentItem';
import SendIcon from '@mui/icons-material/Send';
import SaveBtnDetail from './SaveBtnDetail';

interface props {
    id: string
}

export interface IComment {
    cmt_id: number,
    content: string,
    date: string,
    user: {
        avatar: string,
        full_name: string,
    }
}

interface Pin {
    img_url: string,
    img_name: string,
    isSaved: boolean,
    user: {
        avatar: string
        full_name: string,
    },
    comment: any[],
}

interface User {
    full_name: string,
    avatar: string,
}

const DetailPin: React.FC<props> = ({ id }) => {

    const [onComment, setOnComment] = useState(false);
    const [comment, setComment] = useState('');
    const [user, setUser] = useState<User>();
    const [isCollapse, setIsCollapse] = useState(true);
    const [detail, setDetail] = useState<Pin | null>();
    const input = useRef<HTMLInputElement>(null);
    const [lastCmt, setLastCmt] = useState(0);
    const [comments, setComments] = useState<any[]>([]);
    const [isSaved, setIsSaved] = useState(false);


    console.log({ detail, lastCmt, comments, isSaved })
    useEffect(() => {
        axios.get(`/api/image/get-detail/${id}`)
            .then((res) => [
                console.log('res in DetailImage', res),
                setIsSaved(res.data.content.isSaved),
                setDetail(res.data.content.data),
                setLastCmt(res.data.content.lastCmt),
                setComments(res.data.content.data.comment)
            ])
            .catch((err) => console.log('err:::::', err))
    }, [])

    useEffect(() => {
        axios.get('/api/user/me')
            .then((res) => setUser(res.data.content))
            .catch((err) => console.log('err', err))
    }, [])

    const handleCollapse = () => {
        setIsCollapse(!isCollapse);
    }

    const handleComment = (e: ChangeEvent<HTMLInputElement>) => {
        setComment(e.currentTarget.value);
        if (e.currentTarget.value === '') {
            setOnComment(false);
        } else {
            setOnComment(true);
        }
    }

    const handleSend = () => {
        axios.post(`/api/image/add-comment/${id}`, {
            content: comment,
        })
            .then((ress) => {
                setComment('');
                axios.get(`/api/image/get-detail/${id}`)
                    .then((res) => [
                        setComments((prev) => [...prev, ress.data.content.comment]),
                        setLastCmt(res.data.content.lastCmt)
                    ])
                    .catch((err) => console.log('err:::::', err))
            })
    }

    const handleLoadmoreComment = () => {
        axios.get(`/api/image/get-detail/${id}?qCmt=${lastCmt}`)
            .then((res) => [
                setComments((prev) => [...prev, ...res.data.content.data.comment]),
                setLastCmt(res.data.content.lastCmt)
            ])
            .catch((err) => console.log('err:::::', err))
    }

    return (
        <div className='pin__modal'>
            <div className='pin__img'>
                {detail?.img_url && <Image defaultValue={''} src={detail?.img_url} width={500} height={500} alt={detail?.img_name} />}
            </div>
            <div className='pin__info'>
                <div></div>
                <div className='pin__action'>
                    <div>
                        <ShareButton />
                    </div>
                    <SaveBtnDetail imgId={Number(id)} isSaved={isSaved} />
                </div>
                <div className='pin__content'>
                    <h1>{detail?.img_name}</h1>
                    <div className='pin__author'>
                        <div className='left'>
                            {detail?.user?.avatar
                                ? <Image className='img' width={40} height={40} src={detail?.user?.avatar} alt='avatar' />
                                : <Avatar className='img' sx={{ bgcolor: deepOrange[500] }}>{detail?.user?.full_name[0]}</Avatar>
                            }
                            <h3>{detail?.user?.full_name}</h3>
                        </div>
                        <button className='btn-follow'>Follow</button>
                    </div>
                </div>
                <div className='pin__comment'>
                    <div className='comment__collapse' onClick={handleCollapse}>
                        <h3>Comments</h3>
                        {isCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </div>
                    {
                        comments.length == 0
                            ? <p>No comments yet! Add one to start the conversation.</p>
                            : <Collapse className='comment__list' in={isCollapse} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {
                                        comments.map((cmt: IComment, idx: number) => {
                                            return <ListItem key={idx} style={{ padding: '12px 0' }}>
                                                <CommentItem data={cmt} />
                                            </ListItem>
                                        })
                                    }
                                </List>
                                {lastCmt && <p className='comment__showmore' onClick={handleLoadmoreComment}>Show more</p>}
                            </Collapse>
                    }

                </div>
                <div className='pin__send'>
                    <h3 className='send__title'>What do you think?</h3>
                    <div className='user__comment'>
                        {user?.avatar
                            ? <Image defaultValue={''} className='img' width={40} height={40} src={user?.avatar} alt='avatar' />
                            : <Avatar className='img' sx={{ bgcolor: deepOrange[500] }}>{user?.full_name[0]}</Avatar>
                        }
                        <div className='user__input'>
                            <input ref={input} type="text" placeholder='Add a comment' onChange={handleComment} value={comment} />
                            <SendIcon className={`${onComment && 'active'}`} onClick={handleSend} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailPin