
const users = [];

const addUser = ({ id, type, test }) => {
  type = type.trim().toLowerCase();
  test = test.trim().toLowerCase();

  const existingUser = users.find((user) => user.test === test && user.type === type);

  if(existingUser) return { error: 'Username type is alredy taken.' };

  const user = { id, type, test };

  users.push(user);

  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInTest = (test) => users.filter((user) => user.test === test);

module.exports = { addUser, removeUser, getUser, getUsersInTest };