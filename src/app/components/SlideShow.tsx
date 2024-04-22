import React, { useEffect, useState } from 'react'
import '../../styles/register.scss'
import 'animate.css';
import Image from 'next/image';

const SlideShow = () => {

    return (
        <div className='slideshow'>
            <video autoPlay loop muted >
                <source src="/videos/vid1.mp4" type="video/mp4" />
            </video>
            <div className='slide__item'>
                <Image className='i1' src="/images/img1.jpg" width={200} height={200} alt="" />
            </div>
            <div className='slide__item'>
                <Image className='i2' src="/images/img2.jpg" width={200} height={200} alt="" />
            </div>
            <div className='slide__item'>
                <Image className='i3' src="/images/img3.jpg" width={200} height={200} alt="" />
            </div>
            <div className='slide__item'>
                <Image className='i2' src="/images/img4.jpg" width={200} height={200} alt="" />
            </div>
            <div className='slide__item'>
                <Image className='i1' src="/images/img5.jpg" width={200} height={200} alt="" />
            </div>
            <div className='slide__item'>
                <Image className='i2' src="/images/img6.jpg" width={200} height={200} alt="" />
            </div>
            <div className='slide__item'>
                <Image className='i1' src="/images/img7.jpg" width={200} height={200} alt="" />
            </div>
        </div>
    )
}

export default SlideShow