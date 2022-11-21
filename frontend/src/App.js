import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './styles/index.css';
import './styles/darkmode.css';
import './styles/desktop.css';
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
      <TodoList items={items}/>
      <Footer />
    </div>
  )
}

export default App
