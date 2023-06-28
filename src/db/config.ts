import { Sequelize } from 'sequelize-typescript';

const connection = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'webacademy',
  password: 'Web@cad123',
  database: 'funcionarios',
  logging: false,
});

export default connection;
