"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TaskSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 50,
        minlength: 3,
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        required: [true, 'Please provide status'],
    },
    status: {
        type: String,
        enum: ['TODO', 'IN Progress', 'Under Review', 'Rework', 'Completed'],
        default: 'todo'
    },
    description: {
        type: String,
        default: 'No Description',
    },
    createdBy: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
    startDate: {
        type: Date,
        required: [true, 'please provide start date']
    },
    endDate: {
        type: Date,
        required: [true, 'please provide start date']
    }
});
exports.default = mongoose_1.default.model('Task', TaskSchema);
