import React, {useState, useEffect} from 'react'
import { Toaster } from 'react-hot-toast'
import './styles/index.css'
import './styles/darkmode.css'
import './styles/desktop.css'
import './styles/signin.css'
import Header from './components/Header'
import CreateNew from './components/CreateNew'
import TodoList from './components/TodoList'
import itemService from "./service/items"

function App() {

  // LOGIN
  const [user, setUser] = useState("")

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      itemService.setToken(user.token)
      setUser(user)
    }
  }, [])

  // DARK MODE
  const [theme, setTheme] = useState('light')

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
      <Header 
        toggleTheme={toggleTheme} 
        theme={theme} 
        user={user} 
        setUser={setUser} 
      />
      {user.id && <CreateNew user={user}/>}
      {user.id && <TodoList user={user}/>}
      <Toaster position="top-right" />
    </div>
  )
}

export default App
