import { Request, Response } from 'express';
import { getNanoId } from "../util/nanoid"
import { ITodo } from 'model/todo';
import { todoIsCompleted } from '../const/const';
import todoSchema from '../schema/todo';

export let todos: ITodo[] = []

// Create todo
export const createTodo = async (req: Request, res: Response) => {   
    // todos.push({...req.body, id:getNanoId(), isCompleted:"Todo"})
    // res.json({message: 'Successfully added'});

    const newTodo = new todoSchema({
        id: getNanoId(),
        isCompleted:"Todo",
        ...req.body
    });
    await newTodo.save();
    res.setHeader('Access-Control-Allow-Origin', 'https://todolist-front-sunha.netlify.app/');
    res.json({ message: 'Succesfully added' })
}

// Read todo
export const getAllTodos = async (req: Request, res: Response) => {
    const result = await todoSchema.find();
    res.setHeader('Access-Control-Allow-Origin', 'https://todolist-front-sunha.netlify.app/');
    res.json(result);
}

// Update todo
export const updateTodo = async (req:Request, res:Response) => {
    // const {id} = req.body 
    // const index = todos.findIndex((todo)=>(todo.id === id))
    // todos[index] = req.body;

    const { id, title, isCompleted, priority } = req.body;
    // const index = todos.findIndex((todo)=>(todo.id === id));
    // todos[index] = { ...todos[index], ...rest };

    try {
        await todoSchema.findOneAndUpdate(
            { id },
            { title, isCompleted, priority }
        )
        res.setHeader('Access-Control-Allow-Origin', 'https://todolist-front-sunha.netlify.app/');
        res.json({message: 'Successfully updated'});
    } catch (err) {}
}

// Update progress
export const updateProcess = async (req:Request, res:Response) => {
    const {id, isCompleted} = req.body
    
    let index = todoIsCompleted.indexOf(isCompleted);
    if (index === todoIsCompleted.length - 1) {
        index = 0;
    } else {
        index += 1;
    }

    try {
        await todoSchema.findOneAndUpdate(
            { id },
            { isCompleted:todoIsCompleted[index] }
        )
        res.setHeader('Access-Control-Allow-Origin', 'https://todolist-front-sunha.netlify.app/');
        res.json({message: 'Successfully updated process'});
    } catch (err) {}

    // const newTodos = todos.map((todo) => {
    //     if(todo.id === id)
    //     return {...todo, isCompleted: todoIsCompleted[index]}
    //     else return {...todo}
    // })
    // todos = newTodos;
    // res.json({message:'Successfully updated process'});
}

// Delete todo
export const deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    // const index = todos.findIndex((todo)=>todo.id === id)
    // todos.splice(index,1);
    // res.json({message: 'Successfully deleted'});
    try {
        await todoSchema.findOneAndDelete({ id });
        res.setHeader('Access-Control-Allow-Origin', 'https://todolist-front-sunha.netlify.app/');
        res.json({message: 'Successfully deleted'});
    } catch (err) {
        res.json({message: 'failed', statusCode: 401})
    }
}