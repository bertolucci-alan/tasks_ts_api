import { Router, Request, Response } from "express";

import { deleteTask, finishTasks, getTasks, saveTasks, showTasks, updateTasks } from "./controller/TaskController";

const routes = Router();

routes.get('/a', (request: Request ,response: Response) => {
    return response.json({message: "Hello World!"});
});

routes.get('/tasks', getTasks);
routes.get('/tasks/:id', showTasks);
routes.post('/task-save', saveTasks);
routes.put('/task-update/:id', updateTasks);
routes.put('/task-finish/:id', finishTasks);
routes.delete('/task-delete/:id', deleteTask);



export default routes;