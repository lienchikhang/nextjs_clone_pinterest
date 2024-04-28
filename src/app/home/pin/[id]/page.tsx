import { Metadata } from 'next';
import React from 'react'
import DetailPin from '@/app/components/DetailImage';
import '../../../../styles/detail.scss';
import BackButton from '@/app/components/BackButton';

export const metadata: Metadata = {
    title: "Pin - Pinterest",
    description: "Pinterest",
};


const Pin = ({ params }: { params: { id: string } }) => {
    return (
        <div className='pin__wrapper'>
            <BackButton />
            <DetailPin id={params.id as string} />
        </div>
    )
}

export default Pin