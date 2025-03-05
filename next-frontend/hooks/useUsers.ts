'use client'
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export const useLogin = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: async(credentials: string) => {
            console.log(credentials)
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Basic ${credentials}`
                }
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
              }
            return response.json();
        },
        onSuccess: () => {
            // Redirect to the login page or home page after successful logout
            router.push('/fruits');
          },
    })
}

export const useSignin = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: async(dataToSend: string) => {
            console.log(dataToSend)
            const response = await fetch('http://localhost:5000/users/signup', {
                method: 'POST',
                body: dataToSend,
                headers: {
                    'content-type': 'application/json',
                }
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
              }
            return response.json();
        },
        onSuccess: () => {
            // Redirect to the login page or home page after successful logout
            router.push('/fruits/login');
          },
    })
}

export const useLogout = () => {
  
    return useMutation({
      mutationFn: async (token: string) => {
        const response = await fetch('http://localhost:5000/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
  
        return response.json();
      },
    //   onSuccess: () => {
    //     // Redirect to the login page or home page after successful logout
    //     router.push('/fruits/login');
    //   },
    //   onError: (error: Error) => {
    //     console.error('Logout error:', error.message);
    //   },
    });
  };