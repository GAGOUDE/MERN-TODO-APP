import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './TodoList';

// const API_URL = 'todos/'

const Form = ({ todos, setTodos }) => {
    const [input, setInput] = useState("");
    const [editTodo, setEditTodo] = useState(null)

    const onInputChange = (event) => {
        setInput(event.target.value);
    };

    const onFormSubmit = async (event) => {
        event.preventDefault();

        if (!editTodo) {
            const response = await axios.post("https://mern-todo-app-0311.onrender.com/todos/", { title: input, completed: false });

            setTodos([...todos, response.data]);
        } else {
            await axios.put(`${"https://mern-todo-app-0311.onrender.com/todos/"}${editTodo._id}`, { title: input, completed: false });

            const editAndUpdateTodo = todos.map((todo) => {
                if (todo._id === editTodo._id) {
                    return { ...todo, title: input, completed: false };
                }
                return todo;
            })

            setTodos(editAndUpdateTodo);
            setEditTodo(null);
        }
        setInput("");
    };

    useEffect(() => {
        if (editTodo) {
            setInput(editTodo.title);
        } else {
            setInput("");
        }
    }, [editTodo]);

    return (
        <>
            <form onSubmit={onFormSubmit} className="form-input-title">
                <input
                    type="text"
                    placeholder="Enter a task"
                    className="task-input"
                    value={input}
                    required
                    onChange={onInputChange}
                />
                <button className='button-add' type='submit'>
                    {editTodo ? "Enregistrer" : "Ajouter"}
                </button>
                {editTodo && (
                    <button className='button-add' onClick={() => setEditTodo(null)}>Annuler</button>
                )}
            </form>
            <div>
                <TodoList
                    todos={todos}
                    setTodos={setTodos}
                    setEditTodo={setEditTodo}
                />
            </div>
        </>
    );
};

export default Form;