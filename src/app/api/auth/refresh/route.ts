import axiosInstance from "@/configs/axios.config";
import { NextRequest, NextResponse } from "next/server";

const POST_URL = 'auth/refresh/'


export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await new Response(req.body).json();

        let response = await axiosInstance.post(POST_URL, {
            headers: {
                'Authorization': `Bearer ${req.cookies.get('c_user')?.value}`
            }
        })

        return NextResponse.json(response.data);

    } catch (error) {
        console.log('erorr', error)
        return NextResponse.json({ error: true })
    }

}