import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'
import Cookies from "js-cookie";
import { serialize } from 'cookie';
import { createCookie } from "./actions";


const DEFAULT_URL = 'http://localhost:8080/auth/login/'

interface payload {
    userId: number,
    iat: number,
    exp: number
}


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

        const res = NextResponse.json(rs);

        return res;

    } catch (error) {

        return NextResponse.json({
            error: {
                mess: 'InternalError'
            }
        })
    }

}