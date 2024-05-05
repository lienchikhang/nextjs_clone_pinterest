'use client';
import { Context } from '@/redux/context';
import { CircularProgress, CircularProgressProps, circularProgressClasses } from '@mui/material';
import { stat } from 'fs';
import React, { useContext } from 'react'

const Loading = (props: CircularProgressProps) => {

    const [state, dispatch] = useContext(Context);

    console.log('state in loading', state);

    return (
        state.isLoading && <div className='loading__wrapper'>
            <React.Fragment>
                <svg width={0} height={0}>
                    <defs>
                        <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="red" />
                            <stop offset="100%" stopColor="#1CB5E0" />
                        </linearGradient>
                    </defs>
                </svg>
                <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
            </React.Fragment>
        </div>

    )
}

export default Loading