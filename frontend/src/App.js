import React from 'react'
import './styles/index.css';
import Header from './components/Header.js'
import CreateNew from './components/CreateNew.js'
import TodoList from './components/TodoList.js'
import Filter from './components/Filter.js'
import Footer from './components/Footer.js'
import {useEffect, useState} from 'react'


function App() {
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
  }, []);

  return (
    <div className="app">
      <Header />
      <CreateNew />
      <TodoList items={items}/>
      <Filter />
      <Footer />
    </div>
  )
}

export default App
