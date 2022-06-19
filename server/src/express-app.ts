import express from 'express';
import cors from 'cors';
import { router as teamsRouter } from './api/items';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/api/health', (req, res) => res.status(200).send('i am alive'));

app.use('/api/items', teamsRouter);
