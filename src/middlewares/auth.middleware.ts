import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authCheck = (req: Request, res: Response, next: NextFunction) => {
  try {
    let header = req.headers['authorization'] || '';

    if (header.split(' ').length > 1) {
      header = header.split(' ')[1];
    }
    const jwtSecretKey = process.env.JWT_SECRET || '';
    const isTokenVerified = jwt.verify(header, jwtSecretKey);

    if (!isTokenVerified) {
      res.status(401).json({ message: 'Unauthorized!!!' });
      return;
    }

    (req as any).user = isTokenVerified;

    next();
  } catch (error) {
    next(error);
  }
};
