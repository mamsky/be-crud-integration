import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';

export interface AppError extends Error {
  status?: number;
}

export const validateData = (Schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      Schema.parse(req.body);
      next();
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        // const errorMessages = error.errors.map((issue: any) => ({
        //   message: `${issue.path.join('.')} is ${issue.message}`,
        // }));
        const errorMessages = error.errors[0].message;
        res.status(400).json({ message: errorMessages });
      } else {
        res.status(500).json({ message: 'internal server error' });
      }
    }
  };
};
