import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { loggerService } from "./services/logger.service.js";
import { bugService } from "./services/bug.service.js";
import { userService } from "./services/user.service.js";

const app = express();

const corsOptions = {
  origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
  credentials: true,
};

app.use(express.static("public"));
app.use(cors(corsOptions));
app.use(cookieParser());

//* Read
app.get("/api/bug", async (req, res) => {
  const filterBy = {
    txt: req.query.txt,
    severity: +req.query.severity,
  };
  try {
    const bugs = await bugService.query(filterBy);
    res.send(bugs);
  } catch (err) {
    loggerService.error(`Couldn't get bugs`, err);
    res.status(400).send("Couldnt get Bugs");
  }
});

app.get("/api/bug/:bugId", async (req, res) => {
  const { bugId } = req.params;
  try {
    const bug = await bugService.getById(bugId);
    res.send(bug);
  } catch (err) {
    loggerService.error(`Couldn't get bug ${bugId}`, err);
    res.status(400).send(`Couldn't get bug`);
  }
});

//* Add/Update
app.post("/api/bug/save", async (req, res) => {
  const bugToSave = {
    _id: req.query._id,
    title: req.query.title,
    severity: +req.query.severity,
    description: req.query.description,
    createdAt: Date.now(),
  };

  try {
    const savedBug = await bugService.save(bugToSave);
    res.send(savedBug);
  } catch (err) {
    loggerService.error(`Couldn't save bug`, err);
    res.status(400).send(`Couldn't save bug`);
  }
});

//* Delete
app.delete("/api/bug/:bugId", async (req, res) => {
  const { bugId } = req.params;
  try {
    await bugService.remove(bugId);
    res.send("OK");
  } catch (err) {
    loggerService.error(`Couldn't remove bug ${bugId}`, err);
    res.status(400).send(`Couldn't remove bug`);
  }
});
//#######################################

//Users endpoints

// #Read
app.get("/api/user", async (req, res) => {
  try {
    const users = await userService.query();
    res.send(users);
  } catch (err) {
    loggerService.error(`Couldn't get users`, err);
    res.status(400).send("Couldnt get User");
  }
});

app.get("/api/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userService.getById(userId);
    res.send(user);
  } catch (err) {
    loggerService.error(`Couldn't get user ${userId}`, err);
    res.status(400).send(`Couldn't get user`);
  }
});

app.delete("/api/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    await userService.remove(userId);
    res.send("OK");
  } catch (err) {
    loggerService.error(`Couldn't remove user ${userId}`, err);
    res.status(400).send(`Couldn't remove user`);
  }
});

app.put("api/user", (req, res) => {});

app.post("/api/user", async (req, res) => {
  const userToSave = {
    fullname: req.query.fullname,
    username: req.query.username,
    password: req.query.password,
    score: req.query.score,
  };

  try {
    const savedUser = await userService.save(userToSave);
    res.send(savedUser);
  } catch (err) {
    loggerService.error(`Couldn't save user`, err);
    res.status(400).send(`Couldn't remove user`);
  }
});

const port = 3030;
app.listen(port, () => {
  loggerService.info(`Example app listening on port http://127.0.0.1:${port}/`);
});
