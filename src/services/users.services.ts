import { prisma } from '../libs/prisma';
import { UsersSchemas } from '../schemas/users.schemas';
import { UsersTypes } from '../types/users.types';

export const getUsers = async () => {
  return await prisma.users.findMany();
};

export const getUsersById = async (id: string) => {
  return await prisma.users.findUnique({
    where: { id },
  });
};

export const getUsersByUsername = async (username: string) => {
  return await prisma.users.findUnique({
    where: {
      username,
    },
  });
};

export const createUsers = async (data: UsersSchemas) => {
  return await prisma.users.create({
    data,
  });
};

export const updateUsers = async (id: string, data: UsersTypes) => {
  return await prisma.users.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteUsers = async (id: string) => {
  return await prisma.users.delete({
    where: { id },
  });
};
