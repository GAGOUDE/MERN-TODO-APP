import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import './App.css';
import axios from 'axios';

const API_URL = 'todos/';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        setTodos(res.data);
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className='container'>
      <div className='app-wrapper'>
        {/* HEADER */}
        <div>
          <Header />
        </div>

        {/* Form */}
        <div>
          <Form
            todos={todos}
            setTodos={setTodos}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
