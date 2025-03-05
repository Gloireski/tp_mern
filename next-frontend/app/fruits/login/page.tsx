'use client'
// import Form from 'next/form'
import React, { useState } from 'react'
// import { useRouter } from 'next/navigation'
import { encode } from 'base-64'
import { useLogin } from '@/hooks/useUsers'
import { useAppContext } from '@/context/AppContext'
// import { setU}
import sha1 from 'sha1'

const LoginPage = () => {
    const { setUser } = useAppContext()
    // const router = useRouter()
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    //handle form input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const loginMutation = useLogin()
    //handle form submission
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()

        const formDataToSend = new FormData()
        formDataToSend.append('email', formData.email)
        formDataToSend.append('password', formData.password)
        const credentials = encode(`${formData.email}:${sha1(formData.password)}`)

        //trigger query
        try {
            // Trigger the mutation
            const data = await loginMutation.mutateAsync(credentials);
            console.log('Login successful:', data);
            // Redirect to a protected page after successful login
            if (data) {
                // router.push('/fruits');
                const { token, user } = data
                setUser(user, token)
            }
            setError('')
          } catch (error) {
            // console.error('Login error:', error);
            if (error instanceof Error) {
              setError(error.message);
            } else {
              setError('An unknown error occurred');
            }
        }
        
    }

    return (
        <div className='min-h-lvh flex flex-col justify-center items-center bg-gradient-to-r from-green-100 to-blue-100'>
            <div className='w-full max-w-lg p-6 bg-white rounded-lg shadow-lg'>
                <h1 className='text-3xl font-bold mb-6 text-center'>Sign In</h1>
                <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center space-y-4'>
                {error && (
                    <p className='text-red-500 text-sm'>Erreur: {error}</p>
                )}
                {/* email */}
                <div>
                    <label className='block text-gray-700 font-semibold'>Email</label>
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        className='
                            w-full px-4 py-2 border border-gray-300 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-green-500
                        '
                        required
                    />
                </div>
                {/* password */}
                <div>
                    <label className='block text-gray-700 font-semibold'>Password</label>
                    <input
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleInputChange}
                        className='
                            w-full px-4 py-2 border border-gray-300 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-green-500
                        '
                        required
                    />
                </div>
               
                {/* Submit button */}
                <button 
                    type='submit'
                    // disabled={useAddFruitMutation.isPending}
                    className='px-4 py-2 bg-green-500 text-white
                    rounded-lg hover:bg-green-600 transition-colors duration-200'>
                    {loginMutation.isPending ? 'Logging in...' : 'Sign In'}
                </button>
                {/* error message */}
                </form>
            </div>
        </div>
    )
}

export default LoginPage