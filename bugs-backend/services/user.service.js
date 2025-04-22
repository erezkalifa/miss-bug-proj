import { readJsonFile, writeJsonFile, makeId } from "./utils.js";

export const userService = {
  query,
  getById,
  remove,
  save,
};

const users = readJsonFile("./data/users.json");

//# Full Crudl

//# Read
async function query() {
  let usersToDisplay = users;
  try {
    return usersToDisplay;
  } catch (error) {
    throw error;
  }
}

async function getById(userId) {
  try {
    const user = users.find((user) => user._id === userId);
    if (!user) throw new Error("Cannot find user");
    return user;
  } catch (err) {
    throw err;
  }
}

//# Remove
async function remove(userId) {
  try {
    const userIdx = users.findIndex((user) => user._id === userId);
    if (userIdx === -1) throw new Error("Cannot find user");
    users.splice(userIdx, 1);
    await saveUsersToFile();
  } catch (err) {
    console.log("err:", err);
  }
}

//# Save/Update
async function save(userToSave) {
  try {
    if (userToSave._id) {
      const userIdx = users.findIndex((user) => user._id === userToSave._id);
      if (userIdx === -1) throw new Error("Cannot find user");
      users[userIdx] = userToSave;
    } else {
      userToSave._id = makeId();
      users.unshift(userToSave);
    }
    await saveUsersToFile();
    return userToSave;
  } catch (err) {
    throw err;
  }
}

function saveUsersToFile() {
  return writeJsonFile("./data/users.json", users);
}
