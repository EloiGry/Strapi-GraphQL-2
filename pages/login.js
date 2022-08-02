import React, { useRef, useEffect, useContext} from 'react';
import { useMutation } from '@apollo/client';
import { UserContext } from '../context/User'
import { LOGIN } from '../utils/api';
import { useRouter } from 'next/router'

const Login = () => {
    const router = useRouter()
    const emailRef = useRef()
    const passwordRef = useRef()
    const {setAuth} = useContext(UserContext)
    const [login, { data: loginData, loading, error }] = useMutation(LOGIN)
    

    useEffect(() => {
      if (loginData) {
          asyncLocalStorageToken.setItem('token', loginData.login.jwt)
          asyncLocalStorageUser.setItem('user', loginData.login.user.id)
          setAuth(true) 
        router.push('/')

      }
      },[loginData])

      const asyncLocalStorageToken = {
        setItem: async function (key, value) {
            return localStorage.setItem(key, value);
        }
      }

      const asyncLocalStorageUser = {
        setItem: async function (key, value) {
            return localStorage.setItem(key, value);
        }
      }

      
    
    
    const handleSubmit = (e) => {
        e.preventDefault()
        login({
            variables: {identifier: emailRef.current.value, password: passwordRef.current.value}}  
        )
    }

    if (loading) return <p>Loading...</p>
    if(error) return <p>Error !</p>

    return (
        <form onSubmit={handleSubmit} className="mt-[7rem]">
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

export default Login;
