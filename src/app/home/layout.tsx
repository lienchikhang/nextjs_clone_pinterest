'use client'

import Provider from '@/redux/provider'
import React from 'react'
import Header from '../components/Header'
import '../../styles/home.scss'

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    return (
        <html lang="en">
            <body className='app'>
                <Provider>
                    <Header />
                    {children}
                </Provider>
            </body>
        </html>
    );
}


export default layout