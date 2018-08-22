import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';
import trimmer from 'trim-request-body';

import user from './routes/user';
import admin from './routes/admin';
import auth from './routes/auth';
import request from './routes/request';

const upload = multer();
const app = express();
const port = process.env.PORT || 8000;

app.use(express.static('./public'));

// allow cross origin access
app.use(cors());

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

// Listen for requests
app.listen(port);

export default app;
