import React, { useState } from 'react'

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function loginUser(e) {
        e.preventDefault();

        const user = {
            username: username,
            password: password,
        }

        console.log(user)

        // axios.get('http://localhost:8080/api/users/, user)
        // .then(res => console.log(res.data));

        // Clear input field after submit
        // e.target.input.value = ""
    }


    return (
        <form className="login-form" onSubmit={loginUser}>
            <h3>Login here:</h3>
            <input 
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
            />
            <input 
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
            />
            <input type="submit" value="Login" />
        </form>
    )
}

export default Login
