import axiosInstance from "@/configs/axios.config";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        console.log('url', req.url.split('api/')[1])

        const query = req.url.split('api/')[1];

        const rs = await axiosInstance.post(query, null, {
            headers: {
                'Authorization': `Bearer ${req.cookies.get('c_user')?.value}`
            }
        })

        console.log('rs', rs)

        return NextResponse.json(rs);
    } catch (error) {
        return NextResponse.json(error);
    }

}