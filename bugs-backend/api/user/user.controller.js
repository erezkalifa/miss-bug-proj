import { userService } from "./user.service.js";
import { loggerService } from "../../services/logger.service.js";

export async function getUsers(req, res) {
  try {
    const users = await userService.query();
    res.send(users);
  } catch (err) {
    loggerService.error(`Couldn't get users`, err);
    res.status(400).send("Couldnt get Users");
  }
}

export async function getUser(req, res) {
  const { userId } = req.params;
  try {
    const user = await userService.getById(userId);
    res.send(user);
  } catch (err) {
    loggerService.error(`Couldn't get user ${userId}`, err);
    res.status(400).send(`Couldn't get user`);
  }
}

export async function removeUser(req, res) {
  const { userId } = req.params;
  try {
    await userService.remove(userId);
    res.send("OK");
  } catch (err) {
    loggerService.error(`Couldn't remove user ${userId}`, err);
    res.status(400).send(`Couldn't remove user`);
  }
}

export async function addUser(req, res) {
  const userToSave = {
    fullname: req.body.fullname,
    username: req.body.username,
    password: req.body.password,
    score: req.body.score,
  };

  try {
    const savedUser = await userService.save(userToSave);
    res.send(savedUser);
  } catch (err) {
    loggerService.error(`Couldn't save user`, err);
    res.status(400).send(`Couldn't remove user`);
  }
}

export async function updateUser(req, res) {
  const { _id, score } = req.body;
  const userToSave = {
    _id,
    score,
  };

  try {
    const savedUser = userService.save(userToSave);
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(`Couldn't save bug`);
  }
}
