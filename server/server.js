
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import apifyRoutes from './routes/apifyRoutes.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/apify', apifyRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Sever Running Successfully on PORT: ${PORT}`);
});