require ("dotenv").config();
const express = require("express");
const LogIn = require ("./logger");
const validateTodo = require("./validator");
const errorHandler = require("./errorHandler");
const connectDB = require ("./database/db");
const Todo = require ("./models/todo.models");
const app = express ();
const cors = require('cors');

app.use (express.json());
app.use (cors());

app.use (LogIn);

connectDB ();

// GET ALL TODOS 
app.get ('/todos', async (req , res) => {
    const todos = await Todo.find ({});

    res.status (200).json (todos);
});


// GET THE COMPLETED TODOS
app.get ('/todos/completed', async (req, res, next ) =>  {

    try {
        
        const completed = await Todo.find ({completed : true})
        res.json (completed);
    } 
    
    catch (error) {
        next (error);
    }
})



// GET TODOS WITH QUERY PARAMETER

app.get ('/todos/completed=false', async (req,res,next) => {

    try {
        
        const todo = await Todo .findOne (req.params.completed);

          if (!todo) return res.status(404).json ({error : "Not found"});
    res.status(200).json(todo);

    } 
    
    catch (error) {
        next (error);
    }

})

// POST New
app.post('/todos', validateTodo, async (req,res, next) => {

    const { task, completed } = req.body;
    const newTodo = new Todo ({

        task, 
        completed,
    });

    await newTodo .save();

  try {
    res.status(201).json(newTodo)
  } catch (error) {
    next (error);
  }
});

// GET One 
app.get ('/todos/:id' , async (req,res, next) => {
   try {
     
    const todo = await Todo .findById ( req.params.id )

    if (!todo) return res.status(404).json ({error : "Not found"});
    res.status(200).json(todo);
   } 
   
   catch (error) {
     next (error);
   }
})

// PATCH 

app.patch ("/todos/:id", async (req,res, next) => {
    try {
        
        const todo = await Todo.findByIdAndUpdate ( req.params.id, req.body, {new: true});

    if (!todo) res.status(400).json ({error: "Not Found"});
    Object.assign(todo, req.body)
    res.status(200).json(todo);
    } catch (error) {
        next(error);
    }
}) 

//DELETE 
app.delete ('/todos/:id', async (req,res, next) => {
    try {
        
        const todo = await Todo.findByIdAndDelete (req.params.id)

    if (todos.length === lenBefore)
        return res.status (400).json ({error : 'Not Found'})
    res.status(204).send();
    }
    
    catch (error) {
        next(error);
    }
})

app.use = errorHandler;

const PORT = process.env.PORT || 3000;
app.listen (PORT, () => console.log('App is listening {PORT}'));