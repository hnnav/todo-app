import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './styles/index.css'
import './styles/darkmode.css'
import './styles/desktop.css'
import './styles/signin.css'
import Header from './components/Header'
import CreateNew from './components/CreateNew'
import TodoList from './components/TodoList'
import service from "./service/items"

function App() {

  const [items, setItems] = useState([])
  const [user, setUser] = useState("");
  
  // LOGIN
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    console.log(loggedUserJSON);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      service.setToken(user.token);
    }
  }, []);

  // FETCH all items & save to state
  useEffect(() => {
    axios.get('https://todo-app-api-u0az.onrender.com/api/items')
    .then(res => {setItems(res.data)})
    .catch((error) => console.log(error))
  }, [items])

  // FETCH all users & save to state
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8080/api/users/')
    .then(res => {setUsers(res.data)})
    .catch((error) => console.log(error))
  }, [users])

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
      <Header toggleTheme={toggleTheme} theme={theme} user={user} setUser={setUser}/>
      <CreateNew />
      <TodoList items={items} />
    </div>
  )
}

export default App
