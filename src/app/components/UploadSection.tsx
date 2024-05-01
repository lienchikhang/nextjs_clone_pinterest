'use client';
import React, { ChangeEvent, useRef, useState } from 'react'
import { InboxOutlined } from '@ant-design/icons';
import type { GetProp, NotificationArgsProps, UploadProps } from 'antd';
import { message, notification, Upload } from 'antd';
import { alpha, Button, FormControl, InputBase, InputLabel, List, ListItem, ListItemAvatar, ListItemText, styled, TextField } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';

const { Dragger } = Upload;


type NotificationPlacement = NotificationArgsProps['placement'];

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type FormValues = {
    title: string;
    desc: string;
};

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });


const UploadSection = () => {

    const [uploadInfo, setUploadInfo] = useState<any>(null);
    const [placeImage, setPlaceImage] = useState<any>(null);
    const { register, handleSubmit, formState: { errors }, setFocus, control } = useForm<FormValues>();
    const [api, contextHolder] = notification.useNotification();

    const props: UploadProps = {
        name: 'file',
        multiple: false,
        // action: '/api/image/upload',
        async onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                const formData = new FormData();
                const file = info?.file?.originFileObj;
                if (file) {
                    formData.append('file', file);
                    setUploadInfo(formData);
                    setPlaceImage(await getBase64(file));
                }
                info.fileList.unshift();
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },

    };

    const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            // console.log(e.target.files)
            const formData = new FormData();
            formData.append('file', e.target.files[0]);
            setUploadInfo(formData);
        }
    }

    const openSuccessNotification = (placement: NotificationPlacement, mess: string) => {
        api.success({
            message: `Notification`,
            description: mess,
            placement,
        });
    };

    const onSubmit: SubmitHandler<FormValues> = (formData) => {
        console.log('formDaat', formData);
        axios.post(`/api/image/create`, formData)
            .then((res: any) => {
                if (res.data?.error) {
                    alert('het phien dang nhap')
                    return;
                }
                console.log('res in create', res.data)
                console.log('first')
                axios.post(
                    `http://localhost:8080/image/upload/${res.data.content.img_id}`,
                    uploadInfo,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${Cookies.get('c_user')}`
                        }
                    }
                ) //new FormData().append('file', uploadInfo)
                    .then((res) => {
                        if (res.data?.error) {
                            alert('het phien dang nhap');
                            window.location.reload();
                            return;
                        }
                        openSuccessNotification('topRight', res.data.message);
                        setPlaceImage(null);
                        setUploadInfo(null);
                    })
            })
            .catch((err) => console.log('err', err))
    }

    return (
        <React.Fragment>
            {contextHolder}
            <div className='upload__section'>
                <div className='upload__left'>
                    <Dragger {...props}>
                        {
                            !placeImage ? <div>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">
                                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                                    banned files.
                                </p>
                            </div> : <img className='placeImage' width={200} height={200} alt='placeimage' src={placeImage} />
                        }
                    </Dragger>
                </div>
                <div className='upload__right'>
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="title"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Title không được bỏ trống' }}
                            render={({ field, fieldState }) => {
                                return (
                                    <TextField
                                        {...field}
                                        className="input"
                                        id="outlined-basic"
                                        label="Title"
                                        fullWidth
                                        variant="outlined"
                                        error={!!fieldState.error}
                                        {...register('title')}
                                    />
                                )
                            }}
                        />
                        {errors.title && <List className="sub-error-list">
                            <ListItem>
                                <ListItemAvatar>
                                    <ErrorIcon />
                                </ListItemAvatar>
                                <ListItemText>
                                    <p>Title không đúng được bỏ trống!</p>
                                </ListItemText>
                            </ListItem>
                        </List>}

                        <Controller
                            name="desc"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Description không được bỏ trống' }}
                            render={({ field, fieldState }) => {
                                return (
                                    <TextField
                                        {...field}
                                        className="input"
                                        id="outlined-basic"
                                        label="Description"
                                        type="text"
                                        multiline
                                        fullWidth
                                        variant="outlined"
                                        {...register('desc')}
                                    />
                                )
                            }}
                        />

                        <Button className="form-btn" type="submit">Continue</Button>
                    </form>

                </div>
            </div>
        </React.Fragment>
    )
}

export default UploadSection