import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';

import user from './routes/user';
import auth from './routes/auth';

const upload = multer();
const app = express();

// parsing application/json
app.use(bodyParser.json());

// parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

// parsing multipart/form-data
app.use(upload.array());

app.use('/api/v1/auth', auth);
app.use('/api/v1/users', user);

// Setup a default route
app.get('/api/v1/', (req, res) => res.status(200).send({
  message: 'Welcome to Maintenance Tracker API. Listening on port 8000'
}));

export default app;
