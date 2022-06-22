import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable('items', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description').nullable();
    table.integer('quantity').notNullable();
    table.boolean('purchased').notNullable().defaultTo(false);
    table.timestamps(true, true);
  });
};

export const down = async (knex: Knex): Promise<void> => {
  throw new Error('hell no');
};
