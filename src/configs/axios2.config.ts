import axios from "axios";
import { headers } from "next/headers";
import { cookies } from 'next/headers';


const axiosClientInstance = axios.create({
    withCredentials: true
})


export default axiosClientInstance;

