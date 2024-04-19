import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {

    console.log(req.nextUrl);

    let verify = req.cookies.get('c_user');

    console.log('middleware running...');
    if (!verify) return NextResponse.redirect(new URL('/', req.nextUrl));


    return NextResponse.next();
}

export const config = {
    matcher: '/',
}