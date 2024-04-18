import axios from "axios";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

const DEFAULT_URL = 'http://localhost:8080/auth/register/'

export async function POST(req: NextApiRequest, res: NextResponse) {
    try {

        const body = await new Response(req.body).json();

        let response = await fetch(DEFAULT_URL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        })
        const rs = await response.json();

        return NextResponse.json(rs);

    } catch (error) {
        console.log('erorr', error)
        return NextResponse.json({ error: true })
    }

}