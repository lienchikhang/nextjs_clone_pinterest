
import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {

    if (!req.nextUrl.pathname) return NextResponse.redirect('http://localhost:3000/home');


    let verify = req.cookies.get('c_user')?.value;


    if (!verify && req.nextUrl.pathname.includes('home')) return NextResponse.redirect('http://localhost:3000/auth/login');

    if (verify && req.nextUrl.pathname.includes('login')) return NextResponse.redirect('http://localhost:3000/home');

    if (verify && req.nextUrl.pathname.includes('register')) return NextResponse.redirect('http://localhost:3000/home');

}

export const config = {
    matcher: '/:path*',

}