import { NextFunction, Request, Response } from 'express';
import {
  createUsers,
  getUsers,
  getUsersById,
  getUsersByUsername,
} from '../services/users.services';
import bcrypt from 'bcrypt';
import { UsersSchemas } from '../schemas/users.schemas';
import jwt from 'jsonwebtoken';

const dice: number = 10;

export const getAllusers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await getUsers();
    res.status(200).json({ message: 'success', data });
  } catch (error) {
    next(error);
  }
};

export const registerUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;

    const findUsername = await getUsersByUsername(body.username);
    if (findUsername) {
      res.status(409).json({ message: 'username already exists' });
      return;
    }

    const passwordHash = await bcrypt.hash(body.password, dice);
    const datas: UsersSchemas = { ...body, password: passwordHash };

    const data = await createUsers(datas);
    res.status(200).json({ message: 'success', data });
  } catch (error) {
    next(error);
  }
};

export const loginUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    const jwtSecret = process.env.JWT_SECRET;

    const getDatausers = await getUsersByUsername(body.username);
    if (!getDatausers) {
      res.status(404).json({ message: 'psername or password wrong' });
      return;
    }
    const comparePassword = await bcrypt.compare(
      body.password,
      getDatausers.password,
    );
    if (!comparePassword) {
      res.status(404).json({ message: 'psername or password wrong' });
      return;
    }

    const token = jwt.sign(
      {
        id: getDatausers.id,
      },
      jwtSecret || '',
      {
        expiresIn: '1h',
      },
    );

    res.status(200).json({ message: 'success', token });
  } catch (error) {
    console.log('catch', error);

    next(error);
  }
};

export const userAuthCheck = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user.id;
    console.log(userId);

    const checkData = await getUsersById(userId);
    if (!checkData) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const { password: unUsedPassword, ...userData } = checkData;
    res.status(200).json({ message: 'success', data: { ...userData } });
  } catch (error) {
    next(error);
  }
};
