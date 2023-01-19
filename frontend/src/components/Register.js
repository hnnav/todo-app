import React, { useState } from 'react'
import toast from 'react-hot-toast'
import userService from "../service/users"

function Register() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const registerUser = async (e) => {
        e.preventDefault()

        try {
            await userService.createNewUser({
                username: e.target.username.value,
                password: e.target.password.value,
            })
            toast.success('User Registered - Please Log In')
        } catch(exception) {
            console.error(exception)
            toast.error(exception.response.data.error)
        }
        setUsername('')
        setPassword('')
    }

    return (
        <form className="register-form" onSubmit={registerUser}>
            <h3>Register</h3>
            <input 
                placeholder="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
            />
            <input 
                placeholder="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
            />
            <input type="submit" value="Register" />
        </form>
    )
}

export default Register
