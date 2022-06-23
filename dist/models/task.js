"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task {
    constructor(o) {
        this.title = o.title;
        this.description = o.description;
        this.status = o.status;
        this.priority = o.priority;
        this.createdBy = o.createdBy;
        this.startDate = o.startDate;
        this.endDate = o.endDate;
    }
}
exports.Task = Task;
