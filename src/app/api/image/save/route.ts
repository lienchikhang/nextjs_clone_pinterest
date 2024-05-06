import axiosInstance from "@/configs/axios.config";
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {

        const query = req.url.split('api/')[1];

        console.log({ query })

        const rs = await axiosInstance.get(query, {
            headers: {
                'Authorization': `Bearer ${req.cookies.get('c_user')?.value}`
            }
        })

        console.log('rs data - when loginExpired', rs);

        return NextResponse.json(rs.data)

    } catch (error) {
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