'use client'

import React, { useEffect, useState } from 'react'
import '../../styles/register.scss'
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import { Transition } from '@headlessui/react';
import 'animate.css';

const SlideShow = () => {
    // const basePath = router.;

    const [isUp, setIsUp] = useState(true);

    useEffect(() => {
        // Tự động thay đổi trạng thái của isUp sau 2 giây
        const interval = setInterval(() => {
            setIsUp((prevIsUp) => !prevIsUp);
        }, 2000);

        // Xóa interval khi component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='slideshow'>
            <video autoPlay loop muted >
                <source src="/videos/vid1.mp4" type="video/mp4" />
            </video>
            <div className='slide__item'>
                <img className="i1" src="/images/img1.jpg" alt="" />
            </div>
            <div className='slide__item'>
                <img className='i2' src="/images/img2.jpg" alt="" />
            </div>
            <div className='slide__item'>
                <img className="i3" src="/images/img3.jpg" alt="" />
            </div>
            <div className='slide__item'>
                <img className='i2' src="/images/img4.jpg" alt="" />
            </div>
            <div className='slide__item'>
                <img className="i1" src="/images/img5.jpg" alt="" />
            </div>
            <div className='slide__item'>
                <img className='i2' src="/images/img6.jpg" alt="" />
            </div>
            <div className='slide__item'>
                <img className="i1" src="/images/img7.jpg" alt="" />
            </div>
        </div>
    )
}

export default SlideShow