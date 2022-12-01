import React from 'react'
import axios from 'axios'

function CreateNew() {

    function handleSubmit(e) {
        e.preventDefault();

        const newTodo = {
            content: e.target.input.value
        }

        axios.post('https://todo-app-api-u0az.onrender.com/api/items', newTodo)
        .then(res => console.log(res.data));

        // Clear input field after submit
        e.target.input.value = ""
    }

    return (
        <form className="add-new" onSubmit={handleSubmit}>
            <input placeholder="Create a new todo..." name="input" ></input>
            <button type="submit"/>
        </form>
    )
}

export default CreateNew
