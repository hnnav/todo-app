import React, {useState, useEffect} from 'react'
import './styles/index.css'
import './styles/darkmode.css'
import './styles/desktop.css'
import './styles/signin.css'
import Header from './components/Header'
import CreateNew from './components/CreateNew'
import TodoList from './components/TodoList'
import itemService from "./service/items"

function App() {

  const [items, setItems] = useState([])
  const [user, setUser] = useState("");
  
  // LOGIN
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      // user.token defined
      itemService.setToken(user.token)
    }
  }, [])

  // FETCH all items & save to state
  useEffect(() => {
    itemService.getAll().then((item) => {
      setItems(item);
    });
  }, [items]);

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
      <CreateNew user={user}/>
      <TodoList items={items} />
    </div>
  )
}

export default App
