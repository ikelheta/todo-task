"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const tasks_1 = __importDefault(require("../db/tasks"));
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class TaskController {
    static addTask(data) {
        console.log(data);
        return (0, rxjs_1.of)(data).pipe((0, operators_1.mergeMap)((m) => (0, rxjs_1.from)(tasks_1.default.create(m))));
    }
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    static deleteTask(id, createdBy) {
        return (0, rxjs_1.of)(true).pipe((0, operators_1.mergeMap)(() => (0, rxjs_1.from)(tasks_1.default.findOneAndDelete({ _id: id, createdBy }))));
    }
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    static updateTask(id, data, createdBy) {
        return (0, rxjs_1.of)(true).pipe((0, operators_1.mergeMap)(() => (0, rxjs_1.from)(tasks_1.default.findOneAndUpdate({ _id: id, createdBy }, data, { new: true }))));
    }
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    static getSingleTask(id, createdBy) {
        return (0, rxjs_1.of)(id).pipe((0, operators_1.mergeMap)((m) => (0, rxjs_1.from)(tasks_1.default.findOne({ _id: id, createdBy }))));
    }
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    static getAllTaskForUser(id) {
        return (0, rxjs_1.of)(id).pipe((0, operators_1.mergeMap)((m) => (0, rxjs_1.from)(tasks_1.default.find({ createdBy: id }).sort({ startDate: 1 }))));
    }
}
exports.TaskController = TaskController;
