
import { sources } from "next/dist/compiled/webpack/webpack";
import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "./configs/axios.config";
import axios from "axios";

export default function middleware(req: NextRequest) {

    if (!req.nextUrl.pathname) return NextResponse.redirect('http://localhost:3000/home');


    let token = req.cookies.get('c_user')?.value;

    // console.log('verify middle', token);

    // axios.post('http://localhost:8080/auth/check', null, {
    //     withCredentials: true,
    // })
    //     .then((res) => console.log('res in authChec', res.data))
    //     .catch((err) => console.log('err in authCheck', err))


    if (!token && req.nextUrl.pathname.includes('home')) return NextResponse.redirect('http://localhost:3000/auth/login');

    if (token && req.nextUrl.pathname.includes('login')) return NextResponse.redirect('http://localhost:3000/home');

    if (token && req.nextUrl.pathname.includes('register')) return NextResponse.redirect('http://localhost:3000/home');

}

export const config = {
    matcher: '/:path*',
    // matcher: [
    //     '/auth/:path*'
    // ],
}