"use client"
import { LockKeyhole, LockKeyholeOpen, LogIn, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, SignInResponse } from "next-auth/react";
import React, { useState } from 'react'

export default function page() {
    const router = useRouter();
    const [eamil, setEamil] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowpassword] = useState(false);
    const [error, setError] = useState<string | null>('');

    const hadleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response:SignInResponse =  await signIn("credentials", {
                redirect: false, // Prevents full-page reload
                email:eamil,
                password,
              });

            if (!response.ok) setError("Registration Failed")
            const data = response.json();
            console.log(data)
        } catch (error) {
            throw new Error("Login Error")
            console.error(error)
        }
    }
    const resetFields = () => {
        setEamil('');
        setPassword('');
    }
    return (
        <div>
            <div className='w-full h-screen flex justify-center items-center'>
                <form onSubmit={hadleLogin} className='flex flex-col gap-4 bg-slate-600 p-8 rounded-[20px] '>
                    <h1 className='text-xl font-semibold text-center'>Login to IMedia Pro</h1>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email</legend>
                        <label className="input validator flex items-center gap-2">
                            <Mail />
                            <input type="email" value={eamil} onChange={(e) => setEamil(e.target.value)} placeholder="Please Enter Email Address" required />
                        </label>
                    </fieldset>
                    <div className="validator-hint hidden">Enter valid email address</div>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">password</legend>
                        <label className="input validator flex items-center gap-2">
                            {showPassword ? <LockKeyholeOpen onClick={() => setShowpassword(!showPassword)} /> : <LockKeyhole onClick={() => setShowpassword(!showPassword)} />}
                            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Please Enter Password" required />
                        </label>
                    </fieldset>
                    <div className='text-center text-white'>{error}</div>
                    <div className='flex justify-between gap-2'>
                        <button type='submit' className="btn btn-primary w-1/2">
                            <LogIn />
                            Register
                        </button>
                        <button className="btn btn-secondary w-1/2" onClick={resetFields}>Reset</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
