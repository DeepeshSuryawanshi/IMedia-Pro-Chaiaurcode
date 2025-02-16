import { authOptions } from "@/lib/auth";
import { NextAuthOptions } from "next-auth";
const handler:NextAuthOptions(authOptions)
export {handler as GET,handler as POST};