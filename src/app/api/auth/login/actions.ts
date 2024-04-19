'use server';

import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'

interface payload {
    userId: number,
    iat: number,
    exp: number
}


export async function createCookie(data: string) {

    const decode = jwt.decode(data) as payload;


    cookies().set('c_user', data, {
        expires: new Date(decode.exp),
        httpOnly: true,
    })

}