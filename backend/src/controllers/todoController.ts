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
// PUT /api/todos/:id - Update todo (ubah task atau tandai selesai)
export const updateTodo = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { task, is_completed } = req.body;
    const userId = res.locals.userId;

    try {
        const affectedRows = await TodoModel.update(
            Number(id),
            task,
            is_completed,
            userId
        );

        // Jika affectedRows = 0, berarti todo tidak ditemukan atau bukan milik user ini
        if (affectedRows === 0) {
            res.status(404).json({
                success: false,
                message: 'Tugas tidak ditemukan!'
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Tugas berhasil diperbarui!'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal memperbarui tugas.'
        });
    }
};
// DELETE /api/todos/:id - Hapus todo
export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const userId = res.locals.userId;

    try {
        const affectedRows = await TodoModel.delete(
            Number(id),
            userId
        );

        // Jika affectedRows = 0, berarti todo tidak ditemukan atau bukan milik user ini
        if (affectedRows === 0) {
            res.status(404).json({
                success: false,
                message: 'Tugas tidak ditemukan!'
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Tugas berhasil dihapus!'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal menghapus tugas.'
        });
    }
};
export const getTodoById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const userId = res.locals.userId;

    const todo = await TodoModel.getById(id, userId);

    if (!todo) {
      res.status(404).json({
        success: false,
        message: "Todo tidak ditemukan!",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server!",
    });
  }
};