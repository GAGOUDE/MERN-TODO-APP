import express, { json } from 'express';
import { set, connect, Schema, model } from 'mongoose';
import cors from 'cors';
import pkg from 'body-parser';
const { urlencoded, json: _json } = pkg;
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

// parse incoming JSON data
app.use(json())
// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }))
// parse application/json
app.use(_json())


app.use(cors())

// connect to MongoDB
set('strictQuery', true)
connect(process.env.URL_MONGODB, { useNewUrlParser: true });

// create a schema for our data
const todoSchema = new Schema({
    title: String,
    completed: Boolean
});

// create a model for our data
const Todo = model('Todo', todoSchema);

// routes
app.get('/', async (req, res) => {
    res.json({ message: "Welcome on Todo Server" })
})

// GET ALL TODO
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET ONE TODO
app.get('/todos/:id', getTodo, (req, res) => {
    res.json(res.todo);
});

// CREATE TODO
app.post('/todos', async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        completed: req.body.completed
    });

    try {
        const newTodo = await todo.save();
        res.status(200).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE TODO
app.put('/todos/:id', getTodo, async (req, res) => {
    if (req.body.title != null) {
        res.todo.title = req.body.title;
    }
    if (req.body.completed != null) {
        res.todo.completed = req.body.completed;
    }
    try {
        const updatedTodo = await res.todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE TODO
app.delete('/todos/:id', getTodo, async (req, res) => {
    try {
        await res.todo.deleteOne();
        res.json({ message: 'Deleted Todo' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// middleware function to get todo by id
async function getTodo(req, res, next) {
    let todo;
    try {
        todo = await Todo.findById(req.params.id);
        if (todo == null) {
            return res.status(404).json({ message: 'Cannot find Todo' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.todo = todo;
    next();
}

// start the server
app.listen(5000, () => {
    console.log('Server started on http://localhost:5000');
});
