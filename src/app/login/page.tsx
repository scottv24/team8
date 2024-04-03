'use client'
import Modal from '@/components/Modal'
import { loggedInCheck, login } from '@/db/login'
import { useEffect, useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
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
    <Modal setOpen={(open: boolean) => {}} noSubmitExit={false}>
      <div className='w-full h-full flex flex-col justify-center align-middle '>
        <p className='font-bold text-blue-900 text-2xl text-center mb-6'>
          Login
        </p>
        <p className='font-bold'>Email</p>
        <input
          className={`${
            error === 'Could not find account with this email'
              ? 'border-red-700 border-4'
              : 'border-2 border-black'
          } rounded-md  p-2`}
          placeholder='example@email.com'
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className='font-bold'>Password</p>
        <input
          className={`${
            error === 'Incorrect password'
              ? 'border-red-700 border-4'
              : 'border-2 border-black'
          } rounded-md  p-2`}
          type='password'
          placeholder='Password...'
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className='p-2 font-semibold text-red-800'>{error}</p>
        <button
          className='bg-blue-900 text-white rounded-md p-2 my-4'
          onClick={async () => {
            const { success, error } = await login(email, password)
            if (success) {
              window.location.replace('/')
            } else {
              setError(error || '')
            }
          }}
        >
          Login
        </button>
      </div>
    </Modal>
  )
}
