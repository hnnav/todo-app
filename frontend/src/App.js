import React from 'react'
import './styles/index.css';
import Header from './components/Header.js'
import CreateNew from './components/CreateNew.js'
import TodoList from './components/TodoList.js'
import Filter from './components/Filter.js'
import Footer from './components/Footer.js'

function App() {
  return (
    <div className="app">
      <Header />
      <CreateNew />
      <TodoList />
      <Filter />
      <Footer />
    </div>
  )
}

export default App
