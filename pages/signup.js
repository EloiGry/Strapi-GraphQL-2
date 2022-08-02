import React, { useRef } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP } from '../utils/api';
import { useRouter } from 'next/router'


const Signup = () => {
  const router = useRouter()
    const nameRef = useRef();
    const emailRef = useRef()
    const passwordRef = useRef()
    const [mutateSignup, {loading, error }] = useMutation(SIGNUP)

    const handleSubmit = async(e) => {
        await e.preventDefault()
        await mutateSignup({
            variables: {username : nameRef.current.value, email: emailRef.current.value, password: passwordRef.current.value}}
        )
        router.push('/login')
    }

        if (loading) return <p>Loading...</p>
        if(error) return <p>Error !</p>

    return (
      <form onSubmit={handleSubmit} className="mt-[7rem]">
        <div>
          <label>Name</label>
          <input type="text" ref={nameRef} className='text-black'/>
        </div>
        <div>
          <label>Email</label>
          <input type="email" ref={emailRef} className='text-black'/>
        </div>
        <div>
          <label>Password</label>
          <input type="password" ref={passwordRef} className='text-black'/>
        </div>
        <input type="submit" className='cursor-pointer'/>
      </form>

    );
};

export default Signup