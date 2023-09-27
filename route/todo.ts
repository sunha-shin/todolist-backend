import { Router } from "express";
import * as todoController from '../controller/todo';

const router:Router = Router();

router.post('/todo', todoController.createTodo); // Create
router.get('/todo', todoController.getAllTodos); // Read
router.put('/todo', todoController.updateTodo)   // Update
router.put('/todo/updateProcess', todoController.updateProcess) // Update InProgress
router.delete('/todo/:id', todoController.deleteTodo); // Delete

export default router;
