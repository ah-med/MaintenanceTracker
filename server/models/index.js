import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();

const connectionString = (process.env.NODE_ENV) ? process.env.TEST_DB_URL
  : process.env.DATABASE_URL;

const pool = new Pool({
  connectionString
});


const db = {
  query: (text, params, callback) => pool.query(text, params, callback)
};

export default db;
