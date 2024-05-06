import React, { useEffect, useState } from 'react'
import '../../styles/register.scss'
import 'animate.css';

const SlideShow = () => {

    return (
        <div className='slideshow'>
            <video autoPlay loop muted >
                <source src="/videos/vid1.mp4" type="video/mp4" />
            </video>
        </div>
    )
}

export default SlideShow