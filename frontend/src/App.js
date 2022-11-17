import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './styles/index.css';
import Header from './components/Header.js'
import CreateNew from './components/CreateNew.js'
import TodoList from './components/TodoList.js'
import Filter from './components/Filter.js'
import Footer from './components/Footer.js'

function App() {

  const [items, setItems] = useState([]);

  // GET all & save to state
  useEffect(() => {
    axios.get('http://localhost:8080/api/items')
    .then(res => {setItems(res.data)})
    .catch((error) => console.log(error))
  }, [items])

  return (
    <div className="app">
      <Header />
      <CreateNew />
      <TodoList items={items}/>
      <Footer />
    </div>
  )
}

export default App
