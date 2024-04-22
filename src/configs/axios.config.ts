import axios from "axios";
import Cookies from 'js-cookie';
import { headers } from "next/headers";
import { cookies } from 'next/headers';
import { getQueue } from "./queue.config";


const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/',
    withCredentials: true
})


// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
    console.log('response', response)
    return response;
}, async function (error) {

    const cookie = cookies().get('c_user');

    console.log('cookie', cookie);

    console.log(error.response.data.message)

    if (error.response.data.message === 'TokenExpiredError') {
        const newToken = await axiosInstance.post('auth/refresh', null, {
            headers: {
                'Authorization': `Bearer ${cookie?.value}`,
            }
        });

        console.log('newToken', newToken.data.content);
        cookies().set('c_user', newToken.data.content);

        if (getQueue().length > 0) {
            return Promise.resolve(JSON.parse(getQueue()[0]));
        }

    }
    //     console.log('res from fail', cookie.data.content);
    //     Cookies.set('c_user', cookie.data.content);

    //     // return Promise.resolve(cookie.data.content);
    // }
    return Promise.reject(error.response.data.mess);
});

export default axiosInstance;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMzY5NTg2NCwiZXhwIjoxNzEzNjk1ODg0fQ.BNHvgbNCeWAtNwucq2OBqnSI_tdYJiL-JqmpwWXppdU