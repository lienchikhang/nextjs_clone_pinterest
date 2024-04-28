import axiosInstance from "@/configs/axios.config";
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {
        console.log('url', req.url.split('api/')[1])

        const query = req.url.split('api/')[1];

        const rs = await axiosInstance.get(query, {
            headers: {
                'Authorization': `Bearer ${req.cookies.get('c_user')?.value}`
            }
        })

        console.log('rs', rs)

        return NextResponse.json(rs.data);
    } catch (error) {
        console.log('errororrorr', error)
        if (error === 'LoginExpired') {
            cookies().delete('c_user');

            return NextResponse.json({ error })
        }

        return NextResponse.error();
    }

}