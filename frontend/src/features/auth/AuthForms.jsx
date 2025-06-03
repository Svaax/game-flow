import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation, useRegisterMutation } from './authAPI'

export default function AuthForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [login, { isLoading: isLoginLoading }] = useLoginMutation()
    const [register, { isLoading: isRegisterLoading }] = useRegisterMutation()
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        try {
            let result
            if (isLogin) {
                result = await login({
                    email: formData.email.trim(),
                    password: formData.password
                }).unwrap()
            } else {
                result = await register({
                    username: formData.username.trim(),
                    email: formData.email.trim(),
                    password: formData.password
                }).unwrap()
            }
            dispatch(setCredentials({ user: result.user, token: result.token }))
            navigate('/')
        } catch (err) {
            console.error('Auth error:', err)
            setError(err?.data?.message || 'Something went wrong')
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition"
                    disabled={isLoginLoading || isRegisterLoading}
                >
                    {isLogin
                        ? isLoginLoading ? 'Logging in...' : 'Login'
                        : isRegisterLoading ? 'Registering...' : 'Register'}
                </button>
            </form>
            <p className="mt-4 text-sm text-center">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-600 hover:underline"
                >
                    {isLogin ? 'Register' : 'Login'}
                </button>
            </p>
        </div>
    )
}
