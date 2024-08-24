const db = require('../config/connection');
const { User } = require('../models');
const cleanDB = require('./cleanDB');

const userData = require('./seedData.json');

db.once('open', async () => {
  await cleanDB('User', 'users');

  for (user of userData){
    await User.create(user);
  }
  // await User.insertMany(userData);

  console.log('Users seeded!');
  process.exit(0);
});
