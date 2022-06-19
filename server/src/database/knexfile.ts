import { Knex } from 'knex';
import os from 'os';
import { knexSnakeCaseMappers } from 'objection';

const root = process.env.NODE_ENV === 'production' ? './build/server' : '.';
const migrations = `${root}/src/database/migrations`;
const seeds = `${root}/src/database/seeds`;

const config: Record<string, Knex.Config> = {
  default: {
    client: 'sqlite3',
    connection: {
      filename: `${os.homedir()}/shoppinglist.sqlite3`,
    },
    ...knexSnakeCaseMappers(),
    migrations: {
      extension: 'ts',
      directory: migrations,
    },
    seeds: {
      extension: 'ts',
      directory: seeds,
    },
    useNullAsDefault: false,
  },
  test: {
    client: 'sqlite3',
    connection: ':memory:',
    ...knexSnakeCaseMappers(),
    migrations: {
      extension: 'ts',
      directory: migrations,
    },
    seeds: {
      extension: 'ts',
      directory: seeds,
    },
    useNullAsDefault: false,
  },
};

export default config;
