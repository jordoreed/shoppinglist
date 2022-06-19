process.on('uncaughtException', (error) => {
  console.error('there was an uncaughtException:', error);
});
process.on('unhandledRejection', (reason) => {
  console.error('there was an unhandledRejection:', reason);
});

import { knex } from './database';
import { app } from './express-app';

knex.migrate.latest();

const PORT_EXPRESS = parseInt(process.env.PORT_EXPRESS || '7777');

app.listen(PORT_EXPRESS, () => {
  console.log(`express running on port ${PORT_EXPRESS}`);
});
