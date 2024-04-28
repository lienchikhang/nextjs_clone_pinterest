'use client'
import Image from 'next/image'
import React from 'react'
import { useRouter } from "next/navigation";
import SaveButton from './SaveButton';


interface Props {
    data: {
        img_url: string
        img_id: number
    },
}

const ImageItem: React.FC<Props> = ({ data }) => {

    const navigate = useRouter();

    const handleClick = () => {
        navigate.push(`home/pin/${data.img_id}`);
    }


    return (
        <div className='image__item'>
            <div onClick={handleClick} className='image__item-cover'></div>
            <SaveButton imgId={data.img_id} />
            <Image onClick={handleClick} src={data.img_url} width={200} height={200} alt='pinterest image' />
        </div>
    )
}

export default ImageItem