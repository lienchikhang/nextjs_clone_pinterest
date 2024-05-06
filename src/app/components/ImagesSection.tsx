'use client'

import React, { useContext, useEffect, useState } from 'react'
import ImageItem from './ImageItem';
import axios from 'axios';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Context } from '@/redux/context';
import HandleInternalError from './HandleInternalError';


interface Image {
    img_url: string
    img_id: number
}


const ImagesSection = () => {

    const [images, setImages] = useState<any[]>([]);
    const [page, setPage] = useState<number>(2);
    const [total, setTotal] = useState(0);
    const [state, dispatch] = useContext(Context);
    const [isError, setError] = useState<null | string>(null);


    console.log({ page, total, images });

    // ?page=${page}
    useEffect(() => {
        dispatch({
            type: 'toggleLoading',
            payload: true,
        });
        axios.get(`/api/image/get-all${state?.search && `?${state.search}`}`)
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

                if (res) {
                    setImages(res?.data?.content?.data);
                    setTotal(res.data.content.totalPage);
                    setPage(2);
                    dispatch({
                        type: 'toggleLoading',
                        payload: false,
                    });
                }
            })
            .catch((err) => [console.log('err', err)])
    }, [state.search])

    const fetchMoreData = (page: number) => {
        dispatch({
            type: 'toggleLoading',
            payload: true,
        });
        axios.get(`/api/image/get-all?page=${page}&${state?.search && state.search}`)
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
                dispatch({
                    type: 'toggleLoading',
                    payload: false,
                });
            })
            .catch((err) => console.log('err', err))
    }

    //images__wrapper

    return (
        <React.Fragment>
            <Loading />
            {isError ? <HandleInternalError mess={isError} /> : <InfiniteScroll
                className='images__wrapper'
                dataLength={images.length}
                next={() => fetchMoreData(page)}
                hasMore={page <= total}
                loader={<h4>Loading...</h4>}

            >
                {images && images.map((img: Image, idx: number) => (
                    <ImageItem key={idx} data={img} />
                ))}
            </InfiniteScroll>}
        </React.Fragment>
    )
}

export default ImagesSection