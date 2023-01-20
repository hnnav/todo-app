import React, { useState, useEffect } from 'react'
import itemService from "../service/items"


function TodoList({ user }) {

    const [items, setItems] = useState([])

    // Get users items & save to state
    useEffect(() => {
        const newArray = []
        itemService.getAll().then((items) => {
            items.map(item => {
                if (item.user && item.user.id === user.id) {
                    // setItems(current => [...current, item]) Gives an infinite loop
                    newArray.push(item)
                    setItems(newArray)
                }
            })
        })
    }, [items])

    // DELETE by id
    const handleDelete = async (id) => {
        itemService.deleteItem(id)
    }

    // UPDATE done / not done
    const handleDone = async (id) => {
        let oldStatus = items.filter(item => (item.id === id))[0].done
        const updatedItem = {
            done: !oldStatus
        }
        itemService.updateDone(id, updatedItem)
    }

    // Clear completed (Delete if done)
    const handleClearCompleted = async (id) => {
        let completedItems = items.filter(item => (item.done === true))
        let itemIds = completedItems.map(item => item.id)
        itemIds.map(id => handleDelete(id))
    };

    // Filter items (all / active / completed)
    const [filter, setFilter] = useState('all');
    let handleFilter = (e) => {
        setFilter(e.target.id)
    }
    
    // const filteredItems = items && items.filter((item) => {
    //     if (filter === 'all') {
    //         return item;
    //     } else if (filter === 'active') {
    //         return item.done === false
    //     } else if (filter === 'completed') {
    //         return item.done === true
    //     }
    // })

    // Number of items not done
    // let itemsLeft = items && items.filter(item => (item.done === false)).length

    return (
        <div>
            {console.log()}
            <div className="todo-list">
                {items && items.map(({id, content, done}) => {
                    return <div key={id} className="item">
                        <img 
                            className={`${done ? "checked-circle" : "empty-circle"}`} 
                            src="/images/circle-outline.png" alt="circle" 
                            onClick={() => handleDone(id)}>
                        </img>
                        <p className={`${done ? "strike-through" : ""}`}> {content} </p>
                        <img className="cross" src="\images\icon-cross.svg" alt="cross" onClick={() => handleDelete(id)}></img>
                    </div>
                })}
                <div className="bottom-row">
                    {/* <p>{itemsLeft} items left</p> */}
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