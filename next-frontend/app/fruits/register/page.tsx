'use client'
// import Form from 'next/form'
import React, { useState } from 'react'
import { useSignin } from '@/hooks/useUsers'
// import { setU}
import sha1 from 'sha1'

const RegisterPage = () => {
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        firstname: '',
        lastname: '',
        role: 'client'
    })

    //handle form input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const signinMutation = useSignin()
    //handle form submission
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()

        //trigger query
        try {
            // Trigger the mutation
            const data = await signinMutation.mutateAsync(JSON.stringify({
                email: formData.email,
                password: sha1(formData.password),
                username: formData.username,
                firstname: formData.firstname,
                lastname: formData.lastname,
                role: formData.role
            }));
            console.log('Login successful:', data);
            // Redirect to a protected page after successful login
            if (data) {
                console.log(data)
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
                <h1 className='text-3xl font-bold mb-6 text-center'>Sign Up</h1>
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
                {/* username */}
                <div>
                    <label className='block text-gray-700 font-semibold'>UserName</label>
                    <input
                        type='text'
                        name='username'
                        value={formData.username}
                        onChange={handleInputChange}
                        className='
                            w-full px-4 py-2 border border-gray-300 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-green-500
                        '
                        required
                    />
                </div>
                {/* firtsname */}
                <div>
                    <label className='block text-gray-700 font-semibold'>FirstName</label>
                    <input
                        type='text'
                        name='firstname'
                        value={formData.firstname}
                        onChange={handleInputChange}
                        className='
                            w-full px-4 py-2 border border-gray-300 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-green-500
                        '
                        required
                    />
                </div>
                {/* lastname */}
                <div>
                    <label className='block text-gray-700 font-semibold'>Lastname</label>
                    <input
                        type='text'
                        name='lastname'
                        value={formData.lastname}
                        onChange={handleInputChange}
                        className='
                            w-full px-4 py-2 border border-gray-300 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-green-500
                        '
                        required
                    />
                </div>
               {/* firtsname */}
               <div>
                    <input
                        type='text'
                        name='role'
                        value={formData.role}
                        onChange={handleInputChange}
                        className='
                            w-full px-4 py-2 border border-gray-300 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-green-500
                        '
                        hidden
                    />
                </div>
                {/* Submit button */}
                <button 
                    type='submit'
                    // disabled={useAddFruitMutation.isPending}
                    className='px-4 py-2 bg-green-500 text-white
                    rounded-lg hover:bg-green-600 transition-colors duration-200'>
                    {signinMutation.isPending ? 'Signing Up...' : 'Sign Up'}
                </button>
                {/* error message */}
                </form>
            </div>
        </div>
    )
}

export default RegisterPage