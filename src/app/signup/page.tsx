'use client'
import Modal from '@/components/Modal'
import { loggedInCheck, login, signUp } from '@/db/login'
import { useEffect, useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState<string>('')
  const [password1, setPassword1] = useState<string>('')
  const [password2, setPassword2] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const checkLogin = async () => {
      const loggedIn = await loggedInCheck()
      if (loggedIn) {
        window.location.replace('/')
      }
    }
    checkLogin()
  }, [])

  return (
    <Modal setOpen={(open: boolean) => {}} noSubmitExit={false} signUp={true}>
      <div className='w-full h-full flex flex-col justify-center align-middle'>
        <p className='font-bold text-blue-900 text-2xl text-center mb-6'>
          Sign Up
        </p>
        <p className='font-bold'>Email</p>
        <input
          className={`${
            error === 'Email already in use'
              ? 'border-red-700 border-4'
              : 'border-2 border-black'
          } rounded-md  p-2`}
          placeholder='example@email.com'
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className='font-bold'>Password</p>
        <input
          className={`${
            error === "Passwords don't match"
              ? 'border-red-700 border-4'
              : 'border-2 border-black'
          } rounded-md  p-2`}
          type='password'
          placeholder='Password...'
          onChange={(e) => setPassword1(e.target.value)}
        />
        <p className='font-bold'>Confirm Password</p>
        <input
          className={`${
            error === "Passwords don't match"
              ? 'border-red-700 border-4'
              : 'border-2 border-black'
          } rounded-md  p-2`}
          type='password'
          placeholder='Password...'
          onChange={(e) => setPassword2(e.target.value)}
        />
        <p className='p-2 font-semibold text-red-800'>{error}</p>
        <button
          className='bg-blue-900 text-white rounded-md p-2 my-4'
          onClick={async () => {
            const { success, error } = await signUp(email, password1, password2)
            if (success) {
              window.location.replace('/')
            } else {
              setError(error || '')
            }
          }}
        >
          Login
        </button>
        <button
          className='underline text-blue-900 font-semibold'
          onClick={() => window.location.replace('/login')}
        >
          Have an account? Login here!
        </button>
      </div>
    </Modal>
  )
}
