'use client'

import { Button, List, ListItem, ListItemAvatar, ListItemText, TextField } from "@mui/material"
import { DatePicker, DateValidationError, LocalizationProvider, PickerChangeHandlerContext } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs, { Dayjs } from "dayjs"
import React, { useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import ErrorIcon from '@mui/icons-material/Error';
import { NotificationArgsProps, notification } from "antd"
import { useRouter } from 'next/navigation';


const date = dayjs('2006-12-31');
const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})[^\s]+$/

const validateEmail = (value: string) => {
    if (!emailRegex.test(value)) {
        return 'Email không đúng định dạng!';
    }
    return true;
};

const validatePassword = (value: string) => {
    if (!passRegex.test(value)) {
        return false;
    }
    return true;
};

type FormValues = {
    email: string;
    password: string;
    age: string;
    fullName: string;
};

type NotificationPlacement = NotificationArgsProps['placement'];


const ModalForm: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
    const { register, handleSubmit, formState: { errors }, setFocus, control } = useForm<FormValues>();
    const [api, contextHolder] = notification.useNotification();
    const router = useRouter();

    React.useEffect(() => {
        setFocus("email");
    }, [setFocus]);

    const openNotification = (placement: NotificationPlacement, mess: string) => {
        api.warning({
            message: `Notification`,
            description: mess,
            placement,
        });
    };

    const openErrorNotification = (placement: NotificationPlacement, mess: string) => {
        api.error({
            message: `Notification`,
            description: mess,
            placement,
        });
    };

    const onChangeDate = (newDate: Dayjs | null, context: PickerChangeHandlerContext<DateValidationError>) => {
        setSelectedDate(newDate?.format('YYYY-MM-DD'));
    }

    const onSubmit: SubmitHandler<FormValues> = async (formData) => {

        if (selectedDate) {
            const age = new Date().getFullYear() - new Date(selectedDate).getFullYear()

            const finalData = {
                ...formData,
                age,
            }

            const rs = await fetch('/api/auth/register', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(finalData)
            })
                .then((res) => res.json())
                .then((data) => [
                    console.log('data::', data),
                    data.error && openErrorNotification('topRight', 'Internal Server Error'),
                    data.status === 409 && openNotification('topRight', data.message),
                    data.status === 201 && router.push('/')
                ])

        }

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
                    rules={{ required: 'Password không được bỏ trống', validate: validatePassword }}
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
                                <p>Password tối thiểu 8 ký tự </p>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <ErrorIcon />
                            </ListItemAvatar>
                            <ListItemText>
                                <p>Password ít nhất một chữ cái thường </p>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <ErrorIcon />
                            </ListItemAvatar>
                            <ListItemText>
                                <p>Password ít nhất một chữ cái hoa </p>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <ErrorIcon />
                            </ListItemAvatar>
                            <ListItemText>
                                <p>Password ít nhất một ký tự đặc biệt</p>
                            </ListItemText>
                        </ListItem>
                    </List>
                }

                <Controller
                    name="fullName"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Họ tên không được bỏ trống' }}
                    render={({ field, fieldState }) => {
                        return (
                            <TextField
                                {...field}
                                className="input"
                                id="outlined-basic"
                                label="Name"
                                fullWidth
                                variant="outlined"
                                error={!!fieldState.error}
                                {...register('fullName')}
                            />
                        )
                    }}
                />
                {errors.fullName && <List className="sub-error-list">
                    <ListItem>
                        <ListItemAvatar>
                            <ErrorIcon />
                        </ListItemAvatar>
                        <ListItemText>
                            <p>Họ tên không được bỏ trống!</p>
                        </ListItemText>
                    </ListItem>
                </List>}

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker onChange={onChangeDate} className="input" label="MM-DD-YYYY" sx={{ width: '100%' }} maxDate={date} />
                </LocalizationProvider>
                <Button className="form-btn" type="submit">Continue</Button>
            </form>
        </React.Fragment>
    )
}

export default ModalForm;