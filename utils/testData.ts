export const TestData = {
  generateMessage: () => `Msg-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
  generateUser: () => `User-${Math.floor(Math.random() * 1000)}`,
};
