import { NextFunction, Request, Response } from 'express';
import {
  createThreadServices,
  deleteThreadService,
  getAllThreadsServices,
  updateThreadServices,
} from '../services/threads.services';

export const getDataThreadController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await getAllThreadsServices();

    res.status(200).json({ message: 'success', data });
  } catch (error) {
    next(error);
  }
};

export const createDataThreadController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user.id;
    const body = req.body;
    const data = await createThreadServices(body, userId);
    res.status(200).json({ message: 'create success', data });
  } catch (error) {
    next(error);
  }
};

export const updateDataThreadController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const data = await updateThreadServices(id, body);
    res.status(200).json({ message: 'edit success', data });
  } catch (error) {
    next(error);
  }
};

export const deleteDataThreadController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const data = await deleteThreadService(id);
    res.status(200).json({ message: 'delete success', data });
  } catch (error) {
    next(error);
  }
};
