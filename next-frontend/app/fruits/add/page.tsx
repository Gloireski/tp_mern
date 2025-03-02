'use client'
// import Form from 'next/form'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAddFruit } from '@/hooks/useFruitMutation'

const AddFruitPage = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        price: '',
        origin: ''
    })
    const [imageFile, setImageFile] = useState<File | null>()
    const [error, setError] = useState<string | null>()

    const useAddFruitMutation = useAddFruit()

    //handle form input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    
    //handle input file chnage
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0])
        }
    }

    //handle form submission
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()

        const formDataToSend = new FormData()
        formDataToSend.append('name', formData.name)
        formDataToSend.append('category', formData.category)
        formDataToSend.append('description', formData.description)
        formDataToSend.append('price', formData.price)
        formDataToSend.append('origin', formData.origin)

        if (imageFile) {
            formDataToSend.append('image', imageFile)
        }
        //trigger mutation
        try {
            const newFruit = await useAddFruitMutation.mutateAsync(formDataToSend)
            console.log(newFruit)
            router.push('/fruits');
        } catch(error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        }
        
    }

    return (
        <div className='p-6 max-w-xl mx-auto'>
            <h1 className='text-3xl font-bold mb-6'>Add new fruit</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                {/* name */}
                <div>
                    <label className='block text-gray-700 font-semibold'>Name</label>
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                        className='
                            w-full px-4 py-2 border border-gray-300 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-green-500
                        '
                        required
                    />
                </div>
                {/* category */}
                <div>
                    <label className='block text-gray-700 font-semibold'>Category</label>
                    <input
                        type='text'
                        name='category'
                        value={formData.category}
                        onChange={handleInputChange}
                        className='
                            w-full px-4 py-2 border border-gray-300 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-green-500
                        '
                        required
                    />
                </div>
                {/* description */}
                <div>
                    <label className='block text-gray-700 font-semibold'>Description</label>
                    <textarea
                        name='description'
                        value={formData.description}
                        onChange={handleInputChange}
                        className='
                            w-full px-4 py-2 border border-gray-300 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-green-500
                        '
                        required
                    />
                </div>
                {/* price */}
                <div>
                    <label className='block text-gray-700 font-semibold'>Price</label>
                    <input
                        type="number"
                        name='price'
                        value={formData.price}
                        onChange={handleInputChange}
                        className='
                            w-full px-4 py-2 border border-gray-300 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-green-500
                        '
                        required
                    />
                </div>
                {/* origin */}
                <div>
                    <label className='block text-gray-700 font-semibold'>Origin</label>
                    <input
                        name='origin'
                        type='text'
                        value={formData.origin}
                        onChange={handleInputChange}
                        className='
                            w-full px-4 py-2 border border-gray-300 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-green-500
                        '
                        required
                    />
                </div>
                {/* Image upload */}
                <div>
                    <label className='block text-gray-700 font-semibold'>Upload Image</label>
                    <input
                        type='file'
                        name='image'
                        onChange={handleFileChange}
                        className='
                            w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-green-500
                        '
                        required
                    />
                </div>
                {/* Submit button */}
                <button 
                    type='submit'
                    disabled={useAddFruitMutation.isPending}
                    className='px-4 py-2 bg-green-500 text-white
                    rounded-lg hover:bg-green-600 transition-colors duration-200'>
                    {useAddFruitMutation.isPending ? 'Adding...' : 'Add Fruit'}
                </button>
                {/* error message */}
                {error && (
                    <p className='text-red-500 text-sm mt-2'>Erreur: {error}</p>
                )}
            </form>
        </div>
    )
}

export default AddFruitPage