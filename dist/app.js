"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const mongoose_1 = require("mongoose");
const rxjs_1 = require("rxjs");
const authontication_1 = require("./middleware/authontication");
const user_1 = require("./controller/user");
const task_1 = require("./controller/task");
const task_2 = require("./models/task");
const login_1 = require("./controller/login");
const path_1 = __importDefault(require("path"));
const cors = require("cors");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
//--------------------------------------------------------------------------------------------------------------------------------------------------------
app.post("/user/register", (req, res) => {
    const p = user_1.UserController.addUser(req.body).pipe((0, rxjs_1.take)(1)).subscribe({
        next(r) {
            res.send(r);
        },
        error(e) {
            console.log(e);
            res.sendStatus(500);
        }
    });
});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
app.post("/user/login", (req, res) => {
    console.log(req.body);
    const p = login_1.LoginController.userLogin(req.body).pipe((0, rxjs_1.take)(1)).subscribe({
        next(r) {
            res.send(r);
        },
        error(e) {
            console.log(e);
            res.sendStatus(e);
        }
    });
});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
app.post('/confirmation/:token', authontication_1.verifyToken, (req, res) => {
    const p = user_1.UserController.verfieEmail(req.user).pipe((0, rxjs_1.take)(1)).subscribe({
        next(r) {
            res.send(r);
        },
        error(e) {
            console.log(e);
            res.sendStatus(500);
        }
    });
});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
app.post('/reset/user', (req, res) => {
    const p = user_1.UserController.sendTokenTouser(req.body.email).pipe((0, rxjs_1.take)(1)).subscribe({
        next(r) {
            res.send(r);
        },
        error(e) {
            console.log(e);
            res.sendStatus(500);
        }
    });
});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
app.post('/reset/:token', authontication_1.verifyToken, (req, res) => {
    const p = user_1.UserController.resetPassword(req.body.password, req.user).pipe((0, rxjs_1.take)(1)).subscribe({
        next(r) {
            res.send(r);
        },
        error(e) {
            console.log(e);
            res.sendStatus(500);
        }
    });
});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------LogIn----------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------
app.post('/task/add', authontication_1.isTokenValid, (req, res) => {
    const task = new task_2.Task(Object.assign(Object.assign({}, req.body), { createdBy: req.user.id }));
    const p = task_1.TaskController.addTask(task).pipe((0, rxjs_1.take)(1)).subscribe({
        next(r) {
            res.send(r);
        },
        error(e) {
            console.log(e);
            res.sendStatus(500);
        }
    });
});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
app.put('/task/update/:id', authontication_1.isTokenValid, (req, res) => {
    const p = task_1.TaskController.updateTask(req.params.id, req.body, req.user.id).pipe((0, rxjs_1.take)(1)).subscribe({
        next(r) {
            res.send(r);
        },
        error(e) {
            res.sendStatus(500);
        }
    });
});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
app.get('/task/find/:id', authontication_1.isTokenValid, (req, res) => {
    const p = task_1.TaskController.getSingleTask(req.params.id, req.user.id).pipe((0, rxjs_1.take)(1)).subscribe({
        next(r) {
            res.send(r);
        },
        error(e) {
            res.sendStatus(500);
        }
    });
});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
app.get('/task/findall', authontication_1.isTokenValid, (req, res) => {
    const p = task_1.TaskController.getAllTaskForUser(req.user.id).pipe((0, rxjs_1.take)(1)).subscribe({
        next(r) {
            res.send(r);
        },
        error(e) {
            res.sendStatus(500);
        }
    });
});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
app.delete('/task/:id', authontication_1.isTokenValid, (req, res) => {
    const p = task_1.TaskController.deleteTask(req.params.id, req.user.id).pipe((0, rxjs_1.take)(1)).subscribe({
        next(r) {
            res.send(r);
        },
        error(e) {
            res.sendStatus(500);
        }
    });
});
//--------------------------------------------------------------------------------------------------------------------------------------------------------
if (process.env.NODE_ENV === "production") {
    let reqFolder = path_1.default.join("../" + __dirname);
    app.use(express_1.default.static(path_1.default.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => {
        const index = path_1.default.join(__dirname, "..", 'frontend', 'build', 'index.html');
        console.log(index);
        res.sendFile(index);
    });
}
else {
    app.get('/', (req, res) => {
        res.send('api runnning');
    });
}
const PORT = 8080;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mongoose_1.connect)(process.env.MONGO_URI || "");
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
});
void start();
