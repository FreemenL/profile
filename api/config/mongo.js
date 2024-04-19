const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

const CONNECTION_URL = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?authMechanism=${process.env.DB_AUTH}`; // &authSource=admin`;
// eslint-disable-next-line no-console
console.log(`connection string: ${CONNECTION_URL}`);

mongoose.connect(CONNECTION_URL);

mongoose.connection.on('connected', () => {
  // eslint-disable-next-line no-console
  console.log('Mongo has connected succesfully');
});
mongoose.connection.on('reconnected', () => {
  // eslint-disable-next-line no-console
  console.log('Mongo has reconnected');
});
mongoose.connection.on('error', (error) => {
  // eslint-disable-next-line no-console
  console.log('Mongo connection has an error', error);
  mongoose.disconnect();
});
mongoose.connection.on('disconnected', () => {
  // eslint-disable-next-line no-console
  console.log('Mongo connection is disconnected');
});
