import axios from "axios";
import Cookies from 'js-cookie';
import { headers } from "next/headers";
import { cookies } from 'next/headers';
import { getQueue } from "./queue.config";


const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/',
    // withCredentials: true
})


// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
    return response;
}, async function (error) {

    const cookie = cookies().get('c_user');

    console.log('error.response', error.response.data.message)
    console.log('error.config.headers', error.config.headers)

    if (error.response.data.message === 'TokenExpiredError') {
        const newToken = await axiosInstance.post('auth/refresh', null, {
            headers: {
                'Authorization': `Bearer ${cookie?.value}`,
            }
        });

        cookies().set('c_user', newToken.data.content);

        const originalRequest = error.config;
        originalRequest.headers['Authorization'] = `Bearer ${newToken.data.content}`;

        return axiosInstance(originalRequest);

    } else {
        return Promise.reject(error.response.data.message);
    }

});

export default axiosInstance;

