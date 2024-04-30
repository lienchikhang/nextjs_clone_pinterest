'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ImageItem from './ImageItem';
import '../../styles/imageSaveSection.scss';
import SaveImageItem from './SaveImageItem';
import { motion, useMotionValue, useMotionValueEvent, useScroll, useViewportScroll } from 'framer-motion';
import InfiniteScroll from 'react-infinite-scroll-component';



const ImageSaveSection = () => {

    const [images, setImages] = useState<any[]>([]);
    const [page, setPage] = useState<number>(2);
    const [total, setTotal] = useState(0);


    console.log({ page, total, images });

    useEffect(() => {
        axios.get(`/api/image/save`)
            .then((res) => {
                if (res.data?.error) {
                    alert('het phien dang nhap');
                    return;
                }
                console.log('rs', res.data);
                setImages(res.data.content.data);
                setTotal(res.data.content.totalPage);

            })
            .catch((err) => console.log('err', err))
    }, [])

    const fetchMoreData = (page: number) => {
        axios.get(`/api/image/save?qRecord=${page}`)
            .then((res) => {
                console.log('rs', res.data);
                setImages(prev => [...prev, ...res.data.content.data]);
                setPage(prev => prev + 1);
            })
            .catch((err) => console.log('err', err))
    }

    console.log('is equal', page == total)

    return (

        <InfiniteScroll
            className='imgSave__wrapper'
            dataLength={images.length}
            next={() => fetchMoreData(page)}
            hasMore={page <= total}
            loader={<h4>Loading...</h4>}
        >
            {images.length != 0 && images.map((image, idx) => {
                return <SaveImageItem key={idx} data={image} />
            })}
        </InfiniteScroll>
    )
}

export default ImageSaveSection