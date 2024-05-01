import React from 'react';
import '../../../styles/userPage.scss';
import { Metadata } from 'next';
import ImageSaveSection from '@/app/components/ImageSaveSection';


export const metadata: Metadata = {
    title: "Save - Pinterest",
    description: "Pinterest",
};

//saved page
const UserPage = () => {
    return (
        <ImageSaveSection />
    )
}

export default UserPage