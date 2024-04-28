import React from 'react'
import { IComment } from './DetailImage'
import Image from 'next/image'
import { Avatar } from '@mui/material'
import { deepOrange } from '@mui/material/colors'

interface Props {
    data: IComment
}

const CommentItem: React.FC<Props> = ({ data }) => {
    return (
        <div className='comment__wrapper'>
            <div className='comment__info'>
                {
                    data?.user?.avatar
                        ? <Image className='img' src={data?.user?.avatar} width={40} height={40} alt='avatar' />
                        : <Avatar className='img' sx={{ bgcolor: deepOrange[500] }}>{data?.user?.full_name[0]}</Avatar>
                }
                <h3>{data?.user?.full_name}</h3>
                <p className='comment__content'>{data?.content}</p>
            </div>
        </div>
    )
}

export default CommentItem