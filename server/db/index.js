import { Pool } from 'pg';
import configJson from '../../config/config';

const env = process.env.NODE_ENV || 'development'; // Use development if no environment is specified
const config = configJson[env]; // load configuration

const connectionString = config.url; // assign connectionString

const pool = new Pool({
  connectionString
});


const db = {
  query: (text, params, callback) => pool.query(text, params, callback)
};

export default db;
