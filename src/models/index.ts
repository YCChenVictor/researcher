"use strict";

import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

let sequelize;

// if (process.env.NODE_ENV === 'development') {
//   sequelize = new Sequelize(process.env.DEV_DATABASE_URL);
// } else if (process.env.NODE_ENV === 'test') {
//   sequelize = new Sequelize(process.env.TEST_DATABASE_URL);
// } else {
//   sequelize = new Sequelize(process.env.DATABASE_URL);
// }

export default sequelize;
