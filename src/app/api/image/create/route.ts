import axiosInstance from "@/configs/axios.config";
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: NextRequest, res: NextApiResponse) {

    try {
        console.log('url', req.url.split('api/')[1])

        const body = await new Response(req.body).json();

        console.log('body', body);

        const query = req.url.split('api/')[1];

        console.log('cook', req.cookies.get('c_user')?.value)

        console.log({ query })
        const rs = await axiosInstance.post(query, body, {
            headers: {
                'Authorization': `Bearer ${req.cookies.get('c_user')?.value}`
            }
        })

        console.log('rs', rs.data)

        return NextResponse.json(rs.data);
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