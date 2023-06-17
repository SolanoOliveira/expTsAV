import { Sequelize } from 'sequelize-typescript';

const connection = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'myuser',
  password: '1234',
  database: 'empresa',
  logging: false,
});

export default connection;
