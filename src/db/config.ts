import { Sequelize } from 'sequelize-typescript';

const connection = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'express',
  password: 'r@(xL!CePBAJg!3S',
  database: 'express',
  logging: false,
});

export default connection;
