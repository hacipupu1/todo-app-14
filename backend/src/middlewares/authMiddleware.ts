import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      message: 'Token tidak ditemukan!'
    });
    return;
  }

  const token = authHeader.substring(7);

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Token tidak ditemukan!'
    });
    return;
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    res.status(500).json({
      success: false,
      message: 'JWT_SECRET belum dikonfigurasi!'
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (
      typeof decoded === 'string' ||
      typeof decoded.userId !== 'number'
    ) {
      res.status(401).json({
        success: false,
        message: 'Token tidak valid!'
      });
      return;
    }

    res.locals.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token tidak valid atau sudah expired!'
    });
  }
};