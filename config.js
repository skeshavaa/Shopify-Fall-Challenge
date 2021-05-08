// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  test: process.env.TEST,
  MongoDB_User: process.env.MongoDB_User,
  MongoDB_Password: process.env.Password,
  ID: process.env.ID,
  SECRET: process.env.SECRET
};