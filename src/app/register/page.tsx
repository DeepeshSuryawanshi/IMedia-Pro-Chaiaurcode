"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function Register() {
    const router = useRouter();
    const [eamil, setEamil] = useState('')
    const [password, setPassword] = useState('')
    const [conformPassword, setConformPassword] = useState('')
    const [error, setError] = useState<string | null>('')

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(password !== conformPassword){
            setError("your Password Dose not match.")
        }
        try {
            const response = await fetch('/api/aut/register',{
                method:"POST",
                headers:{"content-type":"application/json"},
                body:JSON.stringify({eamil,password})
            })
            if(!response.ok) setError("Registration Failed")
            const data = response.json();
            router.push("/login")
            
        } catch (error) {
            console.log(error);

        }
    }

  return (
    <div>Register</div>
  )
}

export default Register