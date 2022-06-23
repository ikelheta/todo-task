"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const authontication_1 = require("./../middleware/authontication");
const user_1 = __importDefault(require("../db/user"));
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
class UserController {
    static addUser(body) {
        const user = new User_1.User(body);
        return (0, rxjs_1.of)(user).pipe((0, operators_1.mergeMap)((m) => (0, rxjs_1.from)(bcrypt_1.default.hash(m.password, 10))), (0, operators_1.mergeMap)((m) => (0, rxjs_1.from)(user_1.default.create(Object.assign(Object.assign({}, user), { password: m })))), (0, operators_1.map)((m) => {
            return { token: (0, authontication_1.createUserToken)(m) };
        }), (0, rxjs_1.tap)((m) => console.log(`http://localhost:3001/confirmation/${m.token}`)));
    }
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    static sendTokenTouser(email) {
        return (0, rxjs_1.of)(email).pipe((0, operators_1.mergeMap)(() => (0, rxjs_1.from)(user_1.default.findOne({ email }))), (0, operators_1.map)((m) => {
            return { token: (0, authontication_1.createUserToken)(m) };
        }), (0, rxjs_1.tap)((m) => console.log(`http://localhost:3001/reset/${m.token}`)));
    }
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    static verfieEmail(user) {
        return (0, rxjs_1.of)(user).pipe((0, operators_1.mergeMap)(() => (0, rxjs_1.from)(user_1.default.findByIdAndUpdate(user.id, { verified: true }, { new: true }))), (0, operators_1.map)((m) => {
            return { token: (0, authontication_1.createUserToken)(m) };
        }));
    }
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    static resetPassword(password, user) {
        console.log(password, user);
        return (0, rxjs_1.of)(password).pipe((0, operators_1.mergeMap)((m) => (0, rxjs_1.from)(bcrypt_1.default.hash(m, 10))), (0, operators_1.mergeMap)((m) => (0, rxjs_1.from)(user_1.default.findByIdAndUpdate(user.id, { password: m }, { new: true }))));
    }
}
exports.UserController = UserController;
