'use client'
import Modal from '@/components/Modal'
import { login } from '@/db/login'
import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <Modal setOpen={(open: boolean) => {}} noSubmitExit={false}>
      <div className='w-full h-full flex flex-col justify-center align-middle '>
        <p className='font-bold text-blue-900 text-2xl text-center mb-6'>
          Login
        </p>
        <p className='font-bold'>Email</p>
        <input
          className='rounded-md border-2 border-black p-2'
          placeholder='example@email.com'
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className='font-bold'>Password</p>
        <input
          className='rounded-md border-2 border-black p-2'
          placeholder='Password...'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className='bg-blue-900 text-white rounded-md p-2 my-4'
          onClick={async () => {
            const success = await login(email, password)
            if (success) {
              window.location.replace('/')
            }
          }}
        >
          Login
        </button>
      </div>
    </Modal>
  )
}
