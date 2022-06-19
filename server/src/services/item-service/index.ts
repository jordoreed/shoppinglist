import { knex } from '../../database';

export type Item = {
  id: number;
  name: string;
  description?: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

export const create = async (
  { name, description, quantity }: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>,
  db = knex
) =>
  await db('items').insert({
    name,
    description,
    quantity,
  });

export const search = async (db = knex): Promise<Item[]> =>
  await db('items').select('*');

export const find = async (id: number, db = knex): Promise<Item | undefined> =>
  (await db('items').select('*').where('id', id).first()) || undefined;

export const update = async (
  updated: Partial<Omit<Item, 'createdAt' | 'updatedAt'>> & { id: number },
  db = knex
) =>
  await db('items')
    .where('id', updated.id)
    .update({
      ...updated,
      updatedAt: Date.now(),
    });

export const remove = async (id: number, db = knex): Promise<Item> =>
  await db('items').where('id', id).del();
