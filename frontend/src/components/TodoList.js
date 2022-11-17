import React, {useState, useEffect} from 'react'
import axios from 'axios'

function TodoList( {items} ) {

    // Filter items (all / active / completed)
    const [filter, setFilter] = useState('all');

    let handleFilter = (e) => {
        setFilter(e.target.id)
    }

    const filteredItems = items.filter((item) => {
        if (filter === 'all') {
            return item;
        } else if (filter === 'active') {
            return item.done.includes(false)
        } else if (filter === 'completed') {
            return item.done.includes(true)
        }
    })

    console.log(filteredItems)

    // DELETE by id
    const handleDelete = async (id) => {
        axios.delete(`http://localhost:8080/api/items/${id}`)
        .then(response => {console.log(response)})
        .catch((error) => console.log(error))
    };

    // UPDATE done
    const handleCheck = async (id) => {
        axios.put(`http://localhost:8080/api/items/${id}`, {
            done: true
        })
        .then(response => {console.log(response)})
        .catch((error) => console.log(error))
    };

    // UPDATE not done
    const handleUncheck = async (id) => {
        axios.put(`http://localhost:8080/api/items/${id}`, {
            done: false
        })
        .then(response => {console.log(response)})
        .catch((error) => console.log(error))
    };

    // Clear completed (Delete if done)
    const handleClearCompleted = async (id) => {

        // Find all completed
        let completedItems = items.filter(item => (item.done === true))

        // get ID's
        let itemIds = completedItems.map(item => item.id)

        // delete each by ID
        itemIds.map(id => handleDelete(id))
    };

    return (
        <div>
            <div className="todo-list">
                <div className="all-items">
                    {items.map((item) => {
                        return <div key={item.id} className="item">
                            <img className="circle" src="\images\gray-circle-outline-png.png" alt="circle" onClick={() => handleCheck(item.id)}></img>
                            {item.done ? <img className="tick" src="/images/icon-check.svg" alt="tick" onClick={() => handleUncheck(item.id)}></img> : null}
                            <p> {item.content} </p>
                            <img className="cross" src="\images\icon-cross.svg" alt="cross" onClick={() => handleDelete(item.id)}></img>
                        </div>
                    })}
                </div>
                <div className="bottom-row">
                    <p>{items.length} items left</p>
                    <p onClick={handleClearCompleted}>Clear completed</p>
                </div>
            </div>
            <div className="filter">
                <p onClick={handleFilter} id="all"> All </p>
                <p onClick={handleFilter} id="active"> Active </p>
                <p onClick={handleFilter} id="completed"> Completed </p>
            </div> 
        </div>
    )
}

export default TodoList
