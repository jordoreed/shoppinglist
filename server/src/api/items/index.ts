import { Router } from 'express';
import { body, validationResult } from 'express-validator';

import * as ItemService from '../../services/item-service';
import { Item } from '../../shared';

const MAX_DESCRIPTION_LENGTH = 100;
const MAX_QUANTITY = 3;

export const router = Router();

const createUpdateValidation = [
  body('name').notEmpty(),
  body('description').isLength({ max: MAX_DESCRIPTION_LENGTH }),
  body('purchased').isBoolean(),
  body('quantity').isInt({ min: 0, max: MAX_QUANTITY }),
];

router.get('/', async (req, res) => {
  const items = await ItemService.search();
  return res.json(items);
});

router.post('/', ...createUpdateValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const item: Item = req.body;
  const [id] = await ItemService.create(item);
  return res.json({ id });
});

router.put('/:id', ...createUpdateValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const item: Item = req.body;
  await ItemService.update(item);
  return res.status(200).send();
});

router.delete('/:id', async (req, res) => {
  await ItemService.remove(req.params.id);
  return res.status(200).send();
});
