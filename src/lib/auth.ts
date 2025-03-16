import { NextAuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import { connectToDataBase } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions:NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Example@email.com" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Missing Email or Password")
                }
                try {
                    await connectToDataBase();
                    const UserGet = await User.findOne({email:credentials.email});
                    if(!UserGet){
                        throw new Error("User Already Exist Withe this Email.");
                    }
                    const passwordPass = await bcrypt.compare(credentials.password,UserGet.password);
                    if(!passwordPass){
                        throw new Error("User Password is Wrong..");
                    }
                    return {
                        id:UserGet._id.toString(),
                        email:UserGet.email
                    }
                } catch (error) {
                    console.log(error)
                    throw new Error("error in NEXT AUTH ");
                }
              }
        })    
    ],
    callbacks:{
        async jwt({token, user}){
            if(user){
                token.id = user.id
            }
            return token
        },
        async session({session,token}){
            if(session.user){
                session.user.id = token.id as string
            }
            return session
        }
    },
    pages:{
        signIn: "/login",
        error:"/login"
    },
    session:{
        strategy:"jwt",
        maxAge:30*24*60*60
    },
    secret:process.env.NEXTAUTH_SECRET
}