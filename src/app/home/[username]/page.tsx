import React, { useState } from 'react';
import '../../../styles/userPage.scss';
import UserInfo from '@/app/components/UserInfo';
import UserSave from '@/app/components/UserSave';
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