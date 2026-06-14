import { auth } from "@/lib/auth";
import { getSafeCallBack, SIGN_IN_PATH } from "./index";
import { NextRequest, NextResponse } from "next/server";

function redirectToSignIn(request:NextRequest,pathname:string){
    const signInUrl = new URL(SIGN_IN_PATH,request.url);

    signInUrl.searchParams.set("callbackUrl",`${pathname}${request.nextUrl.search}`);

    return NextResponse.redirect(signInUrl);
}

function getPostAuthredirectPath(request:NextRequest):string{
    const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
    return getSafeCallBack(callbackUrl)
}

// "/" is always public
export async function handleAuthProxy(request:NextRequest){
    const {pathname} = request.nextUrl;

    if(pathname == "/"){
        return NextResponse.next()
    }

    const session = await auth.api.getSession({
        headers: request.headers
    });

    if(pathname === SIGN_IN_PATH){
        if(session){
            const redirectPath = getPostAuthredirectPath(request);
            return NextResponse.redirect(new URL(redirectPath, request.url))
        }

        return NextResponse.next()
    }

    if(!session){
        return redirectToSignIn(request,pathname)
    }

    return NextResponse.next();
}