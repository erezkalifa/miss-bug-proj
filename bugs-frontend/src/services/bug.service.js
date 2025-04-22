import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";
import axios from "axios";

const STORAGE_KEY = "bugDB";
const BASE_URL = "http://127.0.0.1:3030/api/bug/";

export const bugService = {
  query,
  getById,
  save,
  remove,
  getDefaultFilter,
};

async function query(filterBy = {}) {
  filterBy = { ...filterBy };
  try {
    const { data: bugs } = await axios.get(BASE_URL, { params: filterBy });
    return bugs;
  } catch (err) {
    console.log("err", err);
    throw err;
  }
}
async function getById(bugId) {
  console.log(bugId);
  try {
    const { data: bug } = await axios.get(BASE_URL + bugId);
    return bug;
  } catch (err) {
    console.log("err", err);
    throw err;
  }
}
function remove(bugId) {
  try {
    return axios.delete(BASE_URL + bugId);
  } catch (err) {}
}

async function save(bug) {
  const method = bug._id ? "put" : "post";

  try {
    const { data: savedBug } = await axios[method](
      BASE_URL + (bug._id || ""),
      car
    );
    return savedBug;
  } catch (err) {
    console.log("err:", err);
    throw err;
  }
}

function getDefaultFilter() {
  return { txt: "", severity: "" };
}
