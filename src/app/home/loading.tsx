
'use client';
import React, { useContext, useEffect } from 'react'
import Loading from '../components/Loading'
import { Context } from '@/redux/context';

const loading = () => {

    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        dispatch({
            type: 'toggleLoading',
            payload: true,
        });

        return () => {
            dispatch({
                type: 'toggleLoading',
                payload: false,
            });
        }
    }, [])

    return (
        <Loading />
    )
}

export default loading