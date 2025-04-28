import { bugService } from "./bug.service.js";
import { loggerService } from "../../services/logger.service.js";

export async function getBugs(req, res) {
  const filterBy = {
    txt: req.query.txt || "",
    severity: +req.query.severity || 0,
    labels: req.query.labels ? req.query.labels.split(",") : [],
    sortBy: req.query.sortBy || "",
    sortDir: +req.query.sortDir || 1,
    pageIdx: +req.query.pageIdx || 0,
  };

  try {
    const bugs = await bugService.query(filterBy);
    res.send(bugs);
  } catch (err) {
    loggerService.error(`Couldn't get bugs`, err);
    res.status(400).send("Couldn't get Bugs");
  }
}

export async function getBug(req, res) {
  const { bugId } = req.params;

  let visitedBugs = req.cookies.visitedBugs
    ? JSON.parse(req.cookies.visitedBugs)
    : [];

  if (!visitedBugs.includes(bugId)) {
    visitedBugs.push(bugId);
  }

  console.log("User visited the following bugs:", visitedBugs);
  if (visitedBugs.length > 3) {
    console.log("more than 3");
    return res.status(401).send("Wait for a bit");
  }

  res.cookie("visitedBugs", JSON.stringify(visitedBugs), {
    maxAge: 10000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  try {
    const bug = await bugService.getById(bugId);
    res.send(bug);
  } catch (err) {
    loggerService.error(`Couldn't get bug ${bugId}`, err);
    res.status(400).send(`Couldn't get bug`);
  }
}

export async function addBug(req, res) {
  const bugToSave = {
    title: req.body.title,
    severity: +req.body.severity,
    description: req.body.description,
    createdAt: Date.now(),
    labels: req.body.labels,
  };
  try {
    const savedBug = await bugService.save(bugToSave);
    res.send(savedBug);
  } catch (err) {
    loggerService.error(`Couldn't save bug`, err);
    res.status(400).send(`Couldn't save bug`);
  }
}

export async function updateBug(req, res) {
  const bugToSave = {
    _id: req.body._id,
    severity: req.body.severity,
    description: req.body.description,
  };

  try {
    const updatedBug = await bugService.save(bugToSave);
    res.send(updatedBug);
  } catch (err) {
    loggerService.error(`Couldn't update bug`, err);
    res.status(400).send(`Couldn't update bug`);
  }
}

export async function removeBug(req, res) {
  const { bugId } = req.params;
  try {
    await bugService.remove(bugId);
    res.send("OK");
  } catch (err) {
    loggerService.error(`Couldn't remove bug ${bugId}`, err);
    res.status(400).send(`Couldn't remove bug`);
  }
}
