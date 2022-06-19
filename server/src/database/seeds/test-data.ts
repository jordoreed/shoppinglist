import { Knex } from 'knex';

export const seed = async (knex: Knex) => {
  await knex('items').del();

  await knex('items').insert([
    { id: 1, name: 'item 1', description: 'description 1', quantity: 10 },
  ]);
};
