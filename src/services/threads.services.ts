import { prisma } from '../libs/prisma';
import { ThreadSchemasDTO } from '../schemas/thread.schemas';

export const getAllThreadsServices = async () => {
  return await prisma.threads.findMany();
};

export const getThreadsById = async (id: string) => {
  return await prisma.threads.findMany({
    where: { id },
  });
};

export const createThreadServices = async (
  data: ThreadSchemasDTO,
  userId: string,
) => {
  return await prisma.threads.create({
    data: {
      userId,
      thread: data.thread,
    },
  });
};

export const updateThreadServices = async (
  id: string,
  data: ThreadSchemasDTO,
) => {
  return prisma.threads.update({
    where: { id },
    data,
  });
};

export const deleteThreadService = async (id: string) => {
  return await prisma.threads.delete({
    where: { id },
  });
};
