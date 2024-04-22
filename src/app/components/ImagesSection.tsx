'use client'
import React, { useRef } from 'react'
import useSWR from 'swr'
import ImageItem from './ImageItem';
import axios from 'axios';


const fetcher = (url: string) => axios.get(url)

interface Image {
    img_url: string
    img_id: number
}

const ImagesSection = () => {

    const { data, error, isLoading } = useSWR(
        "/api/image/getAll",
        fetcher,
        {
            revalidateOnFocus: true,
            revalidateIfStale: true,
        }
    );

    if (isLoading) {
        return <div>
            <h1>...Loading</h1>
        </div>
    }

    console.log('data', data)

    return (
        <div className='images__wrapper'>
            {data && data?.data?.content?.data.map((img: Image, idx: number) => {
                return <ImageItem key={idx} data={img} />
            })}
        </div>
    )
}

export default ImagesSection