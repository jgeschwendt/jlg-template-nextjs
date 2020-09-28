import { PrismaClient } from '@prisma/client';
import faker from 'faker';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    if (req.method === 'POST') {
        const product = await prisma.product.create({ data: { name: faker.commerce.product() } });

        res.status(200).json(product);
        return;
    }

    res.status(404).end();
  } catch (exception) {
    res.status(500).end();
  }
};
