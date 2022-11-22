import React, {useState} from 'react'
import axios from 'axios'

function TodoList( {items} ) {
    
    // DELETE by id
    const handleDelete = async (id) => {
        axios.delete(`https://todo-app-api-u0az.onrender.com/api/items/${id}`)
        .then(response => {console.log(response)})
        .catch((error) => console.log(error))
    };

    // UPDATE if done
    const handleCheck = async (id) => {
        axios.put(`https://todo-app-api-u0az.onrender.com/api/items/${id}`, {
            done: true
        })
        .then(response => {console.log(response)})
        .catch((error) => console.log(error))
    };

    // UPDATE not done
    const handleUncheck = async (id) => {
        axios.put(`https://todo-app-api-u0az.onrender.com/api/items/${id}`, {
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

    // Filter items (all / active / completed)
    const [filter, setFilter] = useState('all');
    let handleFilter = (e) => {
        setFilter(e.target.id)
    }

    // eslint-disable-next-line
    const filteredItems = items.filter((item) => {
        if (filter === 'all') {
            return item;
        } else if (filter === 'active') {
            return item.done === false
        } else if (filter === 'completed') {
            return item.done === true
        }
    })
    
    // Number of items not done
    let itemsLeft = items.filter(item => (item.done === false)).length

    return (
        <div>
            <div className="todo-list">
                <div className="all-items">
                    {filteredItems.map(({id, content, done}) => {
                        return <div key={id} className="item">
                            <img className="circle" src="\images\gray-circle-outline-png.png" alt="circle" onClick={() => handleCheck(id)}></img>
                            {done ? <img className="tick" src="/images/icon-check.svg" alt="tick" onClick={() => handleUncheck(id)}></img> : null}
                            <p className={`${done ? "strike-through" : ""}`}> {content} </p>
                            <img className="cross" src="\images\icon-cross.svg" alt="cross" onClick={() => handleDelete(id)}></img>
                        </div>
                    })}
                </div>
                <div className="bottom-row">
                    <p>{itemsLeft} items left</p>
                    <p className="clear-completed" onClick={handleClearCompleted}>Clear completed</p>
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