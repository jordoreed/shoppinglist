import { knex } from './database';

export default async () => {
  await knex.destroy();
};
