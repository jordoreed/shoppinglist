import { Router } from 'express';

import * as ItemService from '../../services/item-service';
import { Item } from 'types/item';

export const router = Router();

router.get('/', async (req, res) => {
  const items = await ItemService.search();
  return res.json(items);
});

router.post('/', async (req, res) => {
  const item: Item = req.body;
  const [id] = await ItemService.create(item);
  return res.json({ id });
});

router.put('/:id', async (req, res) => {
  const item: Item = req.body;
  await ItemService.update(item);
  return res.status(200).send();
});

router.delete('/:id', async (req, res) => {
  await ItemService.remove(req.params.id);
  return res.status(200).send();
});
