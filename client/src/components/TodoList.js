import React from 'react';
import axios from 'axios';

const API_URL = 'todos/';

const TodoList = ({ todos, setTodos, setEditTodo }) => {

    const handleEdit = (id) => {
        const findTodo = todos.find((todo) => todo._id === id);
        setEditTodo(findTodo);
        console.log(findTodo);
    };

    const handleComplete = async (id) => {
        const response = await axios.put(`${API_URL}${id}`, { completed: !todos.completed });
        setTodos(
            todos.map((todo) => {
                if (todo._id === id) {
                    return { ...todo, completed: response.data.completed };
                }
                return todo;
            })
        );
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API_URL}${id}`)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))

        setTodos(todos.filter((todo) => todo._id !== id));
    }

    return (
        <div>
            {todos.map((todo, i) => (
                <li
                    className={`list-item ${todo.completed ? "complete-list" : ""}`}
                    key={i}
                >
                    <p className={`list ${todo.completed ? "complete" : ""}`}>
                        {todo.title}
                    </p>
                    <div className='btn-all'>
                        <button
                            className='button-complete task-button'
                            onClick={() => handleComplete(todo._id)}
                        >
                            Réaliser
                        </button>
                        <button
                            className='button-edit task-button'
                            onClick={() => handleEdit(todo._id)}
                        >
                            Editer
                        </button>
                        <button
                            className='button-delete task-button'
                            onClick={() => handleDelete(todo._id)}
                        >
                            Supprimer
                        </button>
                    </div>
                </li>
            ))}
        </div>
    );
};

export default TodoList;

