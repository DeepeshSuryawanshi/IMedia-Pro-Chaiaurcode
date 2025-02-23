"use client"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React,{useState} from "react";

function Header(){ 
    const {data:session} = useSession();

    const handleSigneOut = async () =>{
        await signOut();

    }
    return(
        <div>
            {session? (
                <div>welcome</div>
            ):(
                <div>
                    <Link href={'/login'}>Log in</Link>
                    <Link href={'/login'}>Register</Link>
                </div>
            )}
            <button onClick={handleSigneOut}></button>
        </div>
    )
}
export default Header;