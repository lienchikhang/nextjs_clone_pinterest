import axiosInstance from "@/configs/axios.config";
import { NextRequest, NextResponse } from "next/server";
import Cookies from 'js-cookie'
import { cookies } from 'next/headers';
import { AxiosError } from "axios";
import { addToQueue } from "@/configs/queue.config";
import { Url } from 'url';
import { NextApiRequest, NextApiResponse } from "next";

const DEFAULT_URL = 'http://localhost:8080/image/get-all/'
let GET_URL = 'image/get-all/'

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {

        console.log('loooo', req.url)

        let queryPath = 'image/get-all/';

        if (req.url) {
            queryPath = req.url?.split('api/')[1]
        }

        let response2 = await axiosInstance.get(queryPath, {
            headers: {
                'Authorization': `Bearer ${cookies().get('c_user')?.value}`
            }
        })

        return NextResponse.json(response2.data);


    } catch (error) {
        console.log('error in route get all', error);

        if (error === 'LoginExpired') {
            cookies().delete('c_user');
            cookies().delete('full_name');
            cookies().delete('avatar');

            return NextResponse.json({
                error: {
                    mess: 'LoginExpired'
                }
            })
        }

        return NextResponse.json({
            error: {
                mess: 'InternalError'
            }
        })

    }
}
