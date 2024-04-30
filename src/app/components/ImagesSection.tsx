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

    const [images, setImages] = useState<any[]>([]);
    const [page, setPage] = useState<number>(2);
    const [total, setTotal] = useState(0);

    console.log({ page, total, images });

    //?page=${page}
    useEffect(() => {
        axios.get(`/api/image/get-all`)
            .then((res) => {
                if (res?.data?.error) {
                    alert('het phien dang nhap');
                    return;
                }
                setImages(res?.data?.content?.data);
                setTotal(res.data.content.totalPage);
            })
            .catch((err) => console.log('err', err))
    }, [])

    const fetchMoreData = (page: number) => {
        axios.get(`/api/image/get-all?page=${page}`)
            .then((res) => {
                console.log('rs', res.data);
                setImages(prev => [...prev, ...res.data.content.data]);
                setPage(prev => prev + 1);
            })
            .catch((err) => console.log('err', err))
    }

    //images__wrapper
    return (
        <InfiniteScroll
            className='images__wrapper'
            dataLength={images.length}
            next={() => fetchMoreData(page)}
            hasMore={page <= total}
            loader={<h4>Loading...</h4>}
        >
            {images && images.map((img: Image, idx: number) => (
                <ImageItem key={idx} data={img} />
            ))}
        </InfiniteScroll>
    )
}

export default ImagesSection