import { Metadata } from 'next';
import React from 'react'
import ImagesSection from '../components/ImagesSection';


export const metadata: Metadata = {
    title: "Pinterest",
    description: "Pinterest",
};

const Home = () => {
    return (
        <section className='home__images'>
            <ImagesSection />
        </section>
    )
}

export default Home

