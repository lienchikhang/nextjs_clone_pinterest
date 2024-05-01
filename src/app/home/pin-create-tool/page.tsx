import CreateSection from '@/app/components/CreateSection';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Create - Pinterest",
    description: "Pinterest",
};

const CreateToolPage = () => {
    return <CreateSection />
}

export default CreateToolPage