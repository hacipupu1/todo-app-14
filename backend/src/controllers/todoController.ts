import { Request, Response } from 'express';
import { TodoModel } from '../models/todoModel.js';

export const getTodos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = res.locals.userId;

   const todos = await TodoModel.findByUserId(userId);
    res.status(200).json({
      success: true,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error server.'
    });
  }
};

export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { task } = req.body;

  try {
    const userId = res.locals.userId;

    await TodoModel.create(userId, task);

    res.status(201).json({
      success: true,
      message: 'Todo berhasil dibuat!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error server.'
    });
  }
};