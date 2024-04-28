'use client';

import { Context } from '@/redux/context';
import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material'
import React, { useContext } from 'react'



const ModalSearch = () => {

    const [state, dispatch] = useContext(Context);


    return (
        <div className={`modal__search-wrapper ${state.modal.isOpen && 'active'}`}>
            <div className={`modal__search`}>
                <h2>Recent searches</h2>
                <ul className='recent__search'>
                    <li>Alternative hair</li>
                    <li>Eren Yeager</li>
                    <li>Web homepage</li>
                    <li>Wall paper</li>
                    <li>Alternative hair</li>
                    <li>Eren Yeager</li>
                </ul>
                <h2>Ideas for you</h2>
                <ul>
                    <li>
                        <img src="/images/img1.jpg" alt="" />
                    </li>
                    <li>
                        <img src="/images/img2.jpg" alt="" />
                    </li>
                    <li>
                        <img src="/images/img3.jpg" alt="" />
                    </li>
                    <li>
                        <img src="/images/img7.jpg" alt="" />
                    </li>
                    <li>
                        <img src="/images/img5.jpg" alt="" />
                    </li>
                    <li>
                        <img src="/images/img6.jpg" alt="" />
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default ModalSearch