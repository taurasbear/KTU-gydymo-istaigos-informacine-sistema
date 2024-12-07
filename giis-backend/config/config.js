require('dotenv').config();

module.exports = {
    development: {
      username: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || null,
      database: process.env.MYSQL_DATABASE || 'giis',
      host: process.env.DB_HOST || '127.0.0.1',
      dialect: 'mysql'
    },
    test: {
      username: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || null,
      database: process.env.MYSQL_DATABASE || 'database_test',
      host: process.env.DB_HOST || '127.0.0.1',
      dialect: 'mysql'
    },
    production: {
      username: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || null,
      database: process.env.MYSQL_DATABASE || 'database_production',
      host: process.env.DB_HOST || '127.0.0.1',
      dialect: 'mysql'
    }
  };