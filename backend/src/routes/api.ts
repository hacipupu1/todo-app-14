import { Router } from 'express';

import {
  register,
  login
} from '../controllers/authController.js';

import {
  getTodos,
  createTodo
} from '../controllers/todoController.js';

import { validateRegister } from '../middlewares/validator.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

// Register
router.post(
  '/auth/register',
  validateRegister,
  register
);

// Login
router.post(
  '/auth/login',
  login
);

// Get semua Todo milik user
router.get(
  '/todos',
  authMiddleware,
  getTodos
);

// Tambah Todo
router.post(
  '/todos',
  authMiddleware,
  createTodo
);

export default router;