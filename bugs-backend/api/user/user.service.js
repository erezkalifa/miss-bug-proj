import { readJsonFile, writeJsonFile, makeId } from "../../services/utils.js";

export const userService = {
  query,
  getById,
  remove,
  save,
};

const users = readJsonFile("./data/users.json");

async function query(filterBy) {
  let usersToDisplay = users;
  // try {
  //   if (filterBy.txt) {
  //     const regExp = new RegExp(filterBy.txt, "i");
  //     usersToDisplay = usersToDisplay.filter((user) => regExp.test(user.title));
  //   }

  //   if (filterBy.severity) {
  //     usersToDisplay = users.filter(
  //       (user) => user.severity === filterBy.severity
  //     );
  //   }

  //   return usersToDisplay;
  // } catch (error) {
  //   throw error;
  // }

  try {
    let usersToDisplay = users;
    return usersToDisplay;
  } catch (err) {
    throw err;
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

async function save(userToSave) {
  console.log(userToSave);
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
