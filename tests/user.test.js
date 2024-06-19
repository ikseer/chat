// tests/user.test.js
const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();
const dburl = process.env.MONGODB_URI;

describe('User Model', () => {
  beforeAll(async () => {
    await mongoose.connect(dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }, 30000); // Increase timeout if necessary

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clear the database before each test
    await User.deleteMany({});
  });

  it('should save a new user', async () => {
    const userData = { username: 'testuser', email: 'testuser@example.com' };
    const newUser = new User(userData);
    const savedUser = await newUser.save();

    // Assertion
    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.email).toBe(userData.email);
  });

  it('should not save a user without required fields', async () => {
    const userWithoutRequiredField = new User({ username: 'testuser' });

    let err;
    try {
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }

    // Assertion
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.email).toBeDefined();
  });
});
