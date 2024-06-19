const request = require('supertest');
const {app,server} = require('../app'); // Adjust the path based on your file structure
// const {server,app} = require('../app'); // Adjust the path based on your file structure
const User =require('../models/User')
const mongoose = require('mongoose');
const Conversation = require('../models/Conversation');
require('dotenv').config();
const dburl = process.env.MONGODB_URI;
beforeAll(async () => {
  // Connect to MongoDB using a test-specific URI or an in-memory database like MongoMemoryServer
  await mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  // Clean up by removing all data from collections after each test
  // await Conversation.deleteMany({});
});

afterAll(async () => {
  // Disconnect MongoDB
  await mongoose.connection.close();
});

describe('Conversations API', () => {
  let conversationId;

  it('should create a new conversation', async () => {
    const userData = { username: 'testuser', email: 'testuser@example.com' };
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    let res = await request(app)
      .post('/conversations')
      .send({ name:"conv1",participants: [savedUser._id,savedUser._id] })
      .expect(201);
      // console.log(res.body)

      conversationId = res.body._id;
        console.log(conversationId);
       res = await request(app)
        .post(`/messages`)
        .send({ conversation:conversationId,sender: savedUser._id ,content: 'Hello, World!' })
        .expect(201);
  
    
    // const conversation = await Conversation.findById(conversationId);
    // expect(conversation.messages.length).toBe(1);

  });
});
