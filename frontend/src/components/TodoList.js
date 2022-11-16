import React from 'react'

function TodoList( {items} ) {
    return (
        <div className="todo-list">
            <div className="all-items">
                {items.map((item) => {
                    return <p className="item" key={item.id}>{item.content}</p>
                })}
            </div>
            <div className="bottom-row">
                <p>{items.length} items left</p>
                <p>Clear completed</p>
            </div>
        </div>
    )
}

export default TodoList
