'use client'

import { Button, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material';
import { NotificationArgsProps, notification } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import ErrorIcon from '@mui/icons-material/Error';
import Cookies from 'js-cookie';
import { Context } from '@/redux/context';

type FormValues = {
    email: string;
    password: string;
    age: string;
    fullName: string;
};

type NotificationPlacement = NotificationArgsProps['placement'];

const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const sleep = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 1000)
    })
}


const validateEmail = (value: string) => {
    if (!emailRegex.test(value)) {
        return 'Email không đúng định dạng!';
    }
    return true;
};

const ModalLogin = () => {

    const { register, handleSubmit, formState: { errors }, setFocus, control } = useForm<FormValues>();
    const [api, contextHolder] = notification.useNotification();
    const [payload, dispatch] = useContext(Context);
    const router = useRouter();


    React.useEffect(() => {
        setFocus("email");
    }, [setFocus]);

    const openErrorNotification = (placement: NotificationPlacement, mess: string) => {
        api.warning({
            message: `Notification`,
            description: mess,
            placement,
        });
    };

    const openSuccessNotification = (placement: NotificationPlacement, mess: string) => {
        api.success({
            message: `Notification`,
            description: mess,
            placement,
        });
    };

    const onSubmit: SubmitHandler<FormValues> = async (formData) => {

        const finalData = {
            ...formData,
        }

        const rs = await fetch('/api/auth/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalData)
        })
            .then((res) => res.json())
            .then(async (data) => {
                console.log('data::', data.content);
                data.status === 409 || data.status === 400 && openErrorNotification('topRight', data.message);
                data.status === 200 && openSuccessNotification('topRight', data.message);
                data.status === 200 && await sleep();
                data.status === 200 && Cookies.set('c_user', data.content.accessToken);
                data.status === 200 && Cookies.set('full_name', data.content.full_name.split('')[0]) && Cookies.set('avatar', data.content.avatar || '') && dispatch({
                    payload: {
                        full_name: data.content.full_name,
                        avatar: data.content.avatar || ''
                    },
                    type: 'updateUser'
                });
                data.status === 200 && router.push('/')
            })
    };

    return (
        <React.Fragment>
            {contextHolder}
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Email không được bỏ trống', validate: validateEmail }}
                    render={({ field, fieldState }) => {
                        return (
                            <TextField
                                {...field}
                                className="input"
                                id="outlined-basic"
                                label="Email"
                                fullWidth
                                variant="outlined"
                                error={!!fieldState.error}
                                {...register('email')}
                            />
                        )
                    }}
                />
                {errors.email && <List className="sub-error-list">
                    <ListItem>
                        <ListItemAvatar>
                            <ErrorIcon />
                        </ListItemAvatar>
                        <ListItemText>
                            <p>Email không đúng định dạng!</p>
                        </ListItemText>
                    </ListItem>
                </List>}

                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Password không được bỏ trống' }}
                    render={({ field, fieldState }) => {
                        return (
                            <TextField
                                {...field}
                                className="input"
                                id="outlined-basic"
                                label="Password"
                                type="password"
                                fullWidth
                                variant="outlined"
                                error={!!fieldState.error}
                                {...register('password')}
                            />
                        )
                    }}
                />

                {errors.password &&
                    <List className="sub-error-list">
                        <ListItem>
                            <ListItemAvatar>
                                <ErrorIcon />
                            </ListItemAvatar>
                            <ListItemText>
                                <p>Password không được bỏ trống</p>
                            </ListItemText>
                        </ListItem>
                    </List>
                }
                <Button className="form-btn" type="submit">Continue</Button>
            </form>
        </React.Fragment>
    )
}

export default ModalLogin