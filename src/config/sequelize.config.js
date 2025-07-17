require('dotenv').config();

const isSSL = process.env.DB_SSL === 'true';

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    dialect: 'postgres',
    dialectOptions: isSSL
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {}, // <- não usa ssl se DB_SSL for false
  },
};
