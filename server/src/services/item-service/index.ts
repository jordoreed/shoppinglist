import { knex } from '../../database';

import { Item } from '../../shared';

export const create = async (
  {
    name,
    description,
    quantity,
    purchased,
  }: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>,
  db = knex
) =>
  await db('items').insert({
    name,
    description,
    quantity,
    purchased,
  });

export const search = async (db = knex): Promise<Item[]> =>
  await db('items').select('*');

export const find = async (id: string, db = knex): Promise<Item | undefined> =>
  (await db('items').select('*').where('id', id).first()) || undefined;

export const update = async (
  updated: Partial<Omit<Item, 'createdAt' | 'updatedAt'>> & { id: string },
  db = knex
) =>
  await db('items')
    .where('id', updated.id)
    .update({
      ...updated,
      updatedAt: Date.now(),
    });

export const remove = async (id: string, db = knex): Promise<Item> =>
  await db('items').where('id', id).del();
