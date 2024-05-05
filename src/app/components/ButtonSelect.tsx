'use client';
import { Select } from 'antd'
import { useRouter } from 'next/navigation';
import React from 'react'



const ButtonSelect = () => {

    const router = useRouter();


    const handleChange = (value: { value: string; label: React.ReactNode }) => {
        console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
        if (value.value == 'Home') {
            router.push('/')
        } else {
            router.push('/home/pin-create-tool');
        }
    };

    return (
        <Select
            labelInValue
            defaultValue={{ value: 'Home', label: 'Home' }}
            style={{ width: 110 }}
            className='my-select'
            variant="borderless"
            onChange={handleChange}
            options={[
                {
                    value: 'Home',
                    label: 'Home',
                },
                {
                    value: 'lucy',
                    label: 'Create',
                },
            ]}
        />
    )
}

export default ButtonSelect