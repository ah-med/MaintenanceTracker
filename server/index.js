import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import trimmer from 'trim-request-body';

import user from './routes/user';
import admin from './routes/admin';
import auth from './routes/auth';
import request from './routes/request';

const upload = multer();
const app = express();

// parsing application/json
app.use(bodyParser.json());

// parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

// parsing multipart/form-data
app.use(upload.array());

// Trim the parsed request body.
app.use(trimmer);

app.use('/api/v1/auth', auth);
app.use('/api/v1/users', user);
app.use('/api/v1/admins', admin);
app.use('/api/v1/requests', request);

// Setup a default route
app.get('/api/v1/', (req, res) => res.status(200).send({
  message: 'Welcome to Maintenance Tracker API. Listening on port 8000'
}));

// Listen for requests
const port = process.env.PORT || 8000;
app.listen(port);

export default app;
