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
      participants = res.body.participants;
     
      expect(Array.isArray(participants)).toBe(true);
      expect(participants).toContain(savedUser._id.toString());
  // });

  // it('should fetch a conversation by ID', async () => {
     res = await request(app)
      .get(`/conversations/${conversationId}`)
      .expect(200);

    expect(res.body._id).toBe(conversationId);
  // });/

  // it('should update a conversation by ID', async () => {
  //    res = await request(app)
  //     .put(`/conversations/${conversationId}`)
  //     .send({ members: ['user1', 'user3'] })
  //     .expect(200);

  //   expect(res.body.members).toEqual(['user1', 'user3']);
  // });

  // it('should delete a conversation by ID', async () => {
    await request(app)
      .delete(`/conversations/${conversationId}`)
      .expect(204);

    const deletedConversation = await Conversation.findById(conversationId);
    expect(deletedConversation).toBeNull();
  });
});
