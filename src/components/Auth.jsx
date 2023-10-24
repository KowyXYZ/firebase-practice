import React, { useState } from 'react'
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";



function Auth() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  console.log(auth?.currentUser?.email)

  const signIn = async() => {
    try{
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (err) {
      alert(err)
    }
  };

  const signInWithGoogle = async() => {
    try{
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      alert(err)
    }
  };

  const logOut = async() => {
    try{
      await signOut(auth)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div className='flex flex-col container mx-auto gap-4 justify-center items-center mt-14'>
      <input className='w-[350px] p-2 border-2' type="text" placeholder='Email. . .' onChange={(e) => setEmail(e.target.value)}/>
      <input className='w-[350px] p-2 border-2' type="password" placeholder='Password. . . ' onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={signIn} className='border-2 p-2'>Sign in</button>

      <button onClick={signInWithGoogle}>Sign in with Google</button>

      <button onClick={logOut}>Log out</button>
    </div>
  )
}

export default Auth
