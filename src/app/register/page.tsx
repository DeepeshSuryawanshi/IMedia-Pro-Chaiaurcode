"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { LockKeyhole, LockKeyholeOpen, Mail } from 'lucide-react';

function Register() {
    const router = useRouter();
    const [eamil, setEamil] = useState('')
    const [password, setPassword] = useState('')
    const [conformPassword, setConformPassword] = useState('');
    const [showPassword, setShowpassword] = useState(false);
    const [error, setError] = useState<string | null>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== conformPassword) {
            setError("your Password Dose not match.");
            throw new Error("Password are not match");
        }
        try {
            const response = await fetch('/api/auth/register', {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({email:eamil,password:password })
            })
            if (!response.ok) setError("Registration Failed")
            const data = response.json();
            router.push("/login")

        } catch (error) {
            console.log(error);
        }
    }
    const resetFields = () => {
        setEamil('');
        setPassword('');
        setConformPassword('');
    }

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 bg-slate-600 p-8 rounded-[20px] '>
                <h1 className='text-xl font-semibold'>Register to IMedia Pro</h1>
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
                        <input type={showPassword?"text":"password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Please Enter Password" required />
                    </label>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Conform Password</legend>
                    <label className="input validator flex items-center gap-2">
                    {showPassword ? <LockKeyholeOpen onClick={() => setShowpassword(!showPassword)} /> : <LockKeyhole onClick={() => setShowpassword(!showPassword)} />}
                        <input type={showPassword?"text":"password"} value={conformPassword} onChange={(e) => setConformPassword(e.target.value)} placeholder="Please Enter Conform Password" required />
                    </label>
                </fieldset>
                <div className='text-lg text-white'>{error}</div>
                <div className='flex justify-between gap-2'>
                    <button type='submit' className="btn btn-primary w-1/2">Register</button>
                    <button className="btn btn-secondary w-1/2" onClick={resetFields}>Reset</button>
                </div>
            </form>
        </div>
    )
}

export default Register