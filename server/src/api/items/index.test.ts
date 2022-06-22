import request from 'supertest';

import { knex } from '../../database';
import { app } from '../../express-app';

describe('/api/items', () => {
  beforeEach(async () => {
    await knex.migrate.latest();
  });

  afterAll(async () => {
    await knex.destroy();
  });

  it('POST /api/items', async () => {
    const res = await request(app).post('/api/items').send({
      description:
        '01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789',
      quantity: -1,
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      errors: [
        { location: 'body', msg: 'Invalid value', param: 'name' },
        {
          location: 'body',
          msg: 'Invalid value',
          param: 'description',
          value:
            '01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789',
        },
        {
          location: 'body',
          msg: 'Invalid value',
          param: 'quantity',
          value: -1,
        },
      ],
    });
  });
});
