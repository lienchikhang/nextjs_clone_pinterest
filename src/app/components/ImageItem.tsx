'use client'

import { Button } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

interface Props {
    data: {
        img_url: string
        img_id: number
    },
}

const ImageItem: React.FC<Props> = ({ data }) => {


    return (
        <div className='image__item'>
            <button>Save</button>
            <Image src={data.img_url} width={200} height={200} alt='pinterest image' />
        </div>
    )
}

export default ImageItem