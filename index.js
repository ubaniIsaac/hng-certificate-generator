//import packages
import express from 'express';
import cors from 'cors';
import 'express-async-errors';

//import Routes
import uploadRoute from './routes/uploadCsv.js';
import convertRoute from './routes/converter.js';
import errorHandlerMiddleware from './Middlewares/error-handler.js';

const app = express();

//External Middlewares
app.use(
  cors({
    origin: '*',
  })
);

//express Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
const baseUrl = '/api/v1';
app.get('/', (req, res) => res.send('HNG CERTIFICATE GENERATOR'));
app.use(`${baseUrl}/upload`, uploadRoute);
app.use(`${baseUrl}/convert`, convertRoute);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;
const start = async () => {
  app.listen(port, () => {
    console.log(`App running on port ${port} ......`);
  });
};

start();
