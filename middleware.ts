import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(){
        return NextResponse.next()
    },
    {
        callbacks:{
            authorized:({token,req})=>{
                let {pathname} = req.nextUrl;
                //allow authe related pathe
                if(
                    pathname.startsWith("/api/auth") ||
                    pathname === "/login" ||
                    pathname === "/register" 
                ){
                    return true
                }
                //public
                if (pathname==="/"|| pathname.startsWith("/api/videos")) {
                    return !!token;
                }
            }
        }
    }
);

export const config = {
    matches:["/((?!_next/static|_next/images|favicon.ico|public/).*)"]
}