'use client'

import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import ImageItem from './ImageItem';
import axios from 'axios';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Waypoint } from 'react-waypoint';


const fetcher = (url: string) => axios.get(url)

interface Image {
    img_url: string
    img_id: number
}


const ImagesSection = () => {

    const [page, setPage] = useState(1);
    const [images, setImages] = useState<any[]>([]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setPage((prev) => prev + 1);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    })

    console.log('images in ImagesSection', images);


    useEffect(() => {
        const fetchData = async () => {
            axios.get(`/api/image/get-all?page=${page}`)
                .then((res) => {
                    if (res?.data?.content) {
                        console.log('res in ImagesSection', res);
                        setImages(prevImages => [...prevImages, ...res?.data?.content?.data])
                    }
                })
                .catch((err) => console.log('err', err))
        };

        fetchData();
    }, [page])

    return (
        <div className='images__wrapper'>

            {images && images.map((img: Image, idx: number) => (
                <ImageItem key={idx} data={img} />
            ))}
        </div>
    )
}

export default ImagesSection