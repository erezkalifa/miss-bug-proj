import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";
import axios from "axios";

const STORAGE_KEY = "userDB";
const BASE_URL = "http://127.0.0.1:3030/api/user/";

export const userService = {
  query,
  getById,
  save,
  remove,
  getDefaultFilter,
};

async function query() {
  try {
    const { data: users } = await axios.get(BASE_URL);
    return users;
  } catch (err) {
    console.log("err", err);
    throw err;
  }
}
async function getById(userId) {
  console.log(userId);
  try {
    const { data: user } = await axios.get(BASE_URL + userId);
    return user;
  } catch (err) {
    console.log("err", err);
    throw err;
  }
}
function remove(userId) {
  try {
    return axios.delete(BASE_URL + userId);
  } catch (err) {}
}

async function save(user) {
  const method = car._id ? "put" : "post";

  try {
    const { data: savedUser } = await axios[method](
      BASE_URL + (user._id || ""),
      car
    );
    return savedUser;
  } catch (err) {
    console.log("err:", err);
    throw err;
  }
}
