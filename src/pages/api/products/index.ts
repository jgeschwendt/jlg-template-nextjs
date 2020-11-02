import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));

const prisma = new PrismaClient();

export default async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const data = await prisma.product.findMany();

  // Artificially delay the request.
  await sleep(1000);

  res.status(200).json(data);
};
