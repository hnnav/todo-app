import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './styles/index.css'
import './styles/darkmode.css'
import './styles/desktop.css'
import './styles/signin.css'
import Header from './components/Header'
import CreateNew from './components/CreateNew'
import TodoList from './components/TodoList'
import Register from './components/Register'
import Login from './components/Login'

function App() {

  // FETCH all & save to state
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('https://todo-app-api-u0az.onrender.com/api/items')
    .then(res => {setItems(res.data)})
    .catch((error) => console.log(error))
  }, [items])

  // Dark mode
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`${theme}`}>
      <Header toggleTheme={toggleTheme} theme={theme}/>
      <CreateNew />
      <TodoList items={items} />
      <Login />
      <Register />
    </div>
  )
}

export default App
