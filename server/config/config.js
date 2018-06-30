require('dotenv').config();

module.exports = {
  development: {
    url: process.env.CONN_STRING_DEV
  },
  test: {
    url: process.env.CONN_STRING_TEST
  },
  production: {
    url: process.env.CONN_STRING_PRO
  }
};
