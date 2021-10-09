import { getRepository } from "typeorm";
import { Tasks } from "../entity/Task";
import { request, Request, response, Response } from "express";

export const getTasks = async (request: Request, response: Response) => {
    const tasks = await getRepository(Tasks).find();
    return response.json(tasks);
}

export const showTasks = async (request: Request, response: Response) => {
    const { id } = request.params;
    const task = await getRepository(Tasks).findOne(id);
    return response.json(task);
}

export const saveTasks = async (request: Request, response: Response) => {
    const tasks = await getRepository(Tasks).save(request.body);
    return response.json(tasks);
}

export const updateTasks = async (request: Request, response: Response) => {
    const { id } = request.params;
    const task = await getRepository(Tasks).update(id, request.body);

    if(task.affected === 1) {
        const taskUpdate = await getRepository(Tasks).findOne(id);
        return response.json(taskUpdate);
    }

    return response.json({"error": "Task not found!"}).status(404);
}

export const finishTasks = async (request: Request, response: Response) => {
    const { id } = request.params;
    const task = await getRepository(Tasks).findOneOrFail(id);
    await getRepository(Tasks).update(id, {
        finish: !task.finish
    });
    return response.json({"task": task});

}

export const deleteTask = async (request: Request, response: Response) => {
    const { id } = request.params;
    const task = await getRepository(Tasks).delete(id);

    if(task.affected === 1) {
        const taskDelete = await getRepository(Tasks).findOne(id);
        return response.json({message: "Task deleted" });
    }

    return response.json({"error": "Task not found!"}).status(404);
}