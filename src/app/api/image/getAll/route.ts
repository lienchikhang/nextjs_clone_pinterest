import axiosInstance from "@/configs/axios.config";
import { NextRequest, NextResponse } from "next/server";
import Cookies from 'js-cookie'
import { cookies } from 'next/headers';
import { AxiosError } from "axios";
import { addToQueue } from "@/configs/queue.config";

const DEFAULT_URL = 'http://localhost:8080/image/get-all/'
const GET_URL = 'image/get-all/'

export async function GET(req: NextRequest) {
    try {


        let response2 = await axiosInstance.get(GET_URL, {
            headers: {
                'Authorization': `Bearer ${req.cookies.get('c_user')?.value}`
            }
        })

        console.log('before', response2);

        addToQueue(JSON.stringify(response2.data));

        console.log('res22222', response2)


        return NextResponse.json(response2.data);


    } catch (error) {
        console.log('error in route get all', error);

        if (error === 'LoginExpired') {
            cookies().delete('c_user');
        }

        return NextResponse.json({ error })

    }
}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMzY5NjE4NCwiZXhwIjoxNzEzNjk2MjA0fQ._tXtXCDtvyYfY-V_wuXXfmY3XZoKVSWJ9D1YKoJKnDY