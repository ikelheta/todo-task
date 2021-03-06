import express from "express";
import "dotenv/config";
import { connect } from "mongoose";
import { take } from "rxjs";
import { isTokenValid, verifyToken } from "./middleware/authontication";
import { UserController } from "./controller/user";
import { TaskController } from "./controller/task";
import { Task } from "./models/task";
import { LoginController } from "./controller/login";
import path from "path";
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

//--------------------------------------------------------------------------------------------------------------------------------------------------------

app.post("/user/register", (req, res) => {
  const p = UserController.addUser(req.body)
    .pipe(take(1))
    .subscribe({
      next(r) {
        res.send(r);
      },
      error(e) {
        console.log(e);
        res.sendStatus(500);
      },
    });
});
//--------------------------------------------------------------------------------------------------------------------------------------------------------

app.post("/user/login", (req, res) => {
  console.log(req.body);
  const p = LoginController.userLogin(req.body)
    .pipe(take(1))
    .subscribe({
      next(r) {
        res.send(r);
      },
      error(e) {
        console.log(e);
        res.sendStatus(e);
      },
    });
});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
app.post("/confirmation/:token", verifyToken, (req, res) => {
  const p = UserController.verfieEmail(req.user)
    .pipe(take(1))
    .subscribe({
      next(r) {
        res.send(r);
      },
      error(e) {
        console.log(e);
        res.sendStatus(500);
      },
    });
});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
app.post("/reset/user", (req, res) => {
  const p = UserController.sendTokenTouser(req.body.email)
    .pipe(take(1))
    .subscribe({
      next(r) {
        res.send(r);
      },
      error(e) {
        console.log(e);
        res.sendStatus(500);
      },
    });
});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
app.post("/reset/:token", verifyToken, (req, res) => {
  const p = UserController.resetPassword(req.body.password, req.user)
    .pipe(take(1))
    .subscribe({
      next(r) {
        res.send(r);
      },
      error(e) {
        console.log(e);
        res.sendStatus(500);
      },
    });
});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------LogIn----------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------------------------
app.post("/task/add", isTokenValid, (req, res) => {
  const task = new Task({ ...req.body, createdBy: req.user.id });
  const p = TaskController.addTask(task)
    .pipe(take(1))
    .subscribe({
      next(r) {
        res.send(r);
      },
      error(e) {
        console.log(e);
        res.sendStatus(500);
      },
    });
});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
app.put("/task/update/:id", isTokenValid, (req, res) => {
  const p = TaskController.updateTask(req.params.id, req.body, req.user.id)
    .pipe(take(1))
    .subscribe({
      next(r) {
        res.send(r);
      },
      error(e) {
        res.sendStatus(500);
      },
    });
});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
app.get("/task/find/:id", isTokenValid, (req, res) => {
  const p = TaskController.getSingleTask(req.params.id, req.user.id)
    .pipe(take(1))
    .subscribe({
      next(r) {
        res.send(r);
      },
      error(e) {
        res.sendStatus(500);
      },
    });
});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
app.get("/task/findall", isTokenValid, (req, res) => {
  const p = TaskController.getAllTaskForUser(req.user.id)
    .pipe(take(1))
    .subscribe({
      next(r) {
        res.send(r);
      },
      error(e) {
        res.sendStatus(500);
      },
    });
});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
app.delete("/task/:id", isTokenValid, (req, res) => {
  const p = TaskController.deleteTask(req.params.id, req.user.id)
    .pipe(take(1))
    .subscribe({
      next(r) {
        res.send(r);
      },
      error(e) {
        res.sendStatus(500);
      },
    });
});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
if (process.env.NODE_ENV === "production") {
  let reqFolder = path.join("../" + __dirname);

  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    const index = path.join(__dirname, "..", "frontend", "build", "index.html");
    console.log(index);
    res.sendFile(index);
  });
} else {
  app.get("/", (req, res) => {
    res.send("api runnning");
  });
}

const PORT = process.env.PORT || 8080;

const start = async (): Promise<void> => {
  try {
    await connect(process.env.MONGO_URI || "", () => {
      app.listen(PORT, () => {
        console.log(`Server started on port ${PORT} and connected succesfully`);
      });
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
