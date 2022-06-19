import { Router } from 'express';
import * as ItemService from '../../services/item-service';

export const router = Router();

router.get('/', async (req, res) => {
  const items = await ItemService.search();
  return res.json(items);
});
