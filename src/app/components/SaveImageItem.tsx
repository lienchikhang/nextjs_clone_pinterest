'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import SaveBtnDetail from './SaveBtnDetail';

interface Props {
    data: {
        img_url: string
        img_id: number
    },
}

const SaveImageItem: React.FC<Props> = ({ data }) => {

    const navigate = useRouter();

    const handleClick = () => {
        navigate.push(`home/pin/${data.img_id}`);
    }


    return (
        <div
            className='image__item'
        >
            <div onClick={handleClick} className='image__item-cover'></div>
            <SaveBtnDetail imgId={data.img_id} isSaved={true} />
            <Image onClick={handleClick} src={data.img_url} width={200} height={200} alt='pinterest image' />
        </div>
    )
}

export default SaveImageItem