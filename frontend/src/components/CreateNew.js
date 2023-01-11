import React from 'react'
import itemService from "../service/items"

function CreateNew() {

    const addItem = (e) => {
        e.preventDefault()
        const newItem = {
          content: e.target.input.value,
        }
        itemService.createNew(newItem)

        // Clear input field after submit
        e.target.input.value = ""
      }

    return (
        <form className="add-new" onSubmit={addItem}>
            <input placeholder="Create a new todo..." name="input" ></input>
            <button type="submit"/>
        </form>
    )
}

export default CreateNew
