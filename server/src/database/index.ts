import Knex from 'knex';
import knexfile from './knexfile';

// const config =
//   process.env.NODE_ENV === 'test' ? knexfile.test : knexfile.default;

export const knex = Knex(knexfile.default);
