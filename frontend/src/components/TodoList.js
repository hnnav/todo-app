import React, {useState, useEffect} from 'react'

function TodoList() {

    const [items, setItems] = useState([]);

    // Fetching from backend
    const getAll = async () => {
      try {
          const res = await fetch('http://localhost:8080/api/items', {
              method: 'GET',
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
              },
          });
          return await res.json();
      } catch (err) {}
    } 
    // Save fetched data to state
    useEffect(() => {
      getAll()
      .then((res) => {
        setItems(res);
      })
      .catch((error) => console.log(error))
    }, [items]);
  
    return (
        <div className="todo-list">
            <div className="all-items">
                {items.map((item) => {
                    return <div className="item">
                        <img className="circle" src="\images\gray-circle-outline-png.png" alt="circle"></img>
                        <p key={item.id}>{item.content}</p>
                        <img src="\images\icon-cross.svg" alt="cross"></img>
                    </div>
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
