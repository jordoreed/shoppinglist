import Knex, { Knex as KnexType } from 'knex';

import knexfile from '../../database/knexfile';
import * as ItemService from './index';

describe('game service', () => {
  let knex: KnexType;

  beforeEach(async () => {
    knex = Knex(knexfile.default);
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterEach(async () => {
    await knex.destroy();
  });

  it('should create an item', async () => {
    const [id] = await ItemService.create(
      {
        name: 'super duper',
        description: 'super awesome thing',
        quantity: 2,
      },
      knex
    );
    const item = await ItemService.find(`${id}`, knex);

    expect(item?.name).toEqual('super duper');
    expect(item?.description).toEqual('super awesome thing');
    expect(item?.quantity).toEqual(2);
    expect(item?.createdAt).toBeTruthy();
    expect(item?.updatedAt).toBeTruthy();
  });

  it('should update an item', async () => {
    const beforeUpdate = await ItemService.find('1', knex);
    await ItemService.update(
      {
        id: '1',
        name: 'updated name',
        description: 'updated description',
        quantity: 1234,
      },
      knex
    );
    const afterUpdate = await ItemService.find('1', knex);

    expect(beforeUpdate).toMatchObject({
      name: 'item 1',
      description: 'description 1',
      quantity: 10,
    });
    expect(afterUpdate).toMatchObject({
      name: 'updated name',
      description: 'updated description',
      quantity: 1234,
    });
  });

  it('should delete an item', async () => {
    const beforeDelete = await ItemService.find('1', knex);
    await ItemService.remove('1', knex);
    const afterDelete = await ItemService.find('1', knex);

    expect(beforeDelete).toMatchObject({
      name: 'item 1',
      description: 'description 1',
      quantity: 10,
    });
    expect(afterDelete).toBeUndefined();
  });
});
