'use client';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import ImageItem from './ImageItem';
import '../../styles/imageSaveSection.scss';
import SaveImageItem from './SaveImageItem';
import { motion, useMotionValue, useMotionValueEvent, useScroll, useViewportScroll } from 'framer-motion';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Context } from '@/redux/context';
import HandleInternalError from './HandleInternalError';



const ImageSaveSection = () => {

    const [images, setImages] = useState<any[]>([]);
    const [page, setPage] = useState<number>(2);
    const [total, setTotal] = useState(0);
    const [state, dispatch] = useContext(Context);
    const [isError, setError] = useState<null | string>(null);


    console.log({ page, total, images });

    useEffect(() => {
        dispatch({
            type: 'toggleLoading',
            payload: true,
        });
        axios.get(`/api/image/save`)
            .then((res) => {
                if (res?.data?.error) {
                    if (res.data.error.mess == 'LoginExpired') {
                        alert('het phien dang nhap');
                        window.location.reload();
                        return;
                    } else {
                        setError('Could not fetch data for that resource');
                        dispatch({
                            type: 'toggleLoading',
                            payload: false,
                        });
                        return;
                    }
                }

                setImages(res.data.content.data);
                setTotal(res.data.content.totalPage);

            })
            .catch((err) => console.log('err', err))
    }, [])

    const fetchMoreData = (page: number) => {
        axios.get(`/api/image/save?page=${page}`)
            .then((res) => {
                if (res?.data?.error) {
                    if (res.data.error.mess == 'LoginExpired') {
                        alert('het phien dang nhap');
                        window.location.reload();
                        return;
                    } else {
                        setError('Could not fetch data for that resource');
                        dispatch({
                            type: 'toggleLoading',
                            payload: false,
                        });
                        return;
                    }
                }
                setImages(prev => [...prev, ...res.data.content.data]);
                setPage(prev => prev + 1);
            })
            .catch((err) => console.log('err', err))
    }

    console.log('is equal', page == total)

    return (
        <React.Fragment>
            {isError ?
                <HandleInternalError mess={isError} /> :
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
                </InfiniteScroll>}
        </React.Fragment>
    )
}

export default ImageSaveSection