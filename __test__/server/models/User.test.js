const mongoose = require('mongoose');
const User = require('../../../server/models/User');

describe('slugify', () => {
  beforeAll(async () => {
    await mongoose.connect(
      `mongodb://${process.env.MONGO_URL}/smarthome-tests`,
      { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true },
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('no duplication', async () => {
    expect.assertions(1);

    await User.deleteMany();
    const user = await User.signInOrSignUp({
      googleId: 'test1',
      email: 'test1@test.ts',
      googleToken: { accessToken: 'test1', refreshToken: 'test1' },
      displayName: 'Test Name',
      avatarUrl: 'test1',
    });

    expect(user.slug).toBe('test-name');
  });
});
