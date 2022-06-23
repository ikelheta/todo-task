"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const authontication_1 = require("./../middleware/authontication");
const user_1 = __importDefault(require("../db/user"));
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const bcrypt_1 = __importDefault(require("bcrypt"));
class LoginController {
    //-----------------------------------------------------------------------------------------------------------------------------------------------------
    static userLogin(body) {
        const { email, password } = body;
        let user;
        return (0, rxjs_1.of)(true).pipe((0, operators_1.mergeMap)(() => (0, rxjs_1.from)(user_1.default.findOne({ email }))), (0, rxjs_1.tap)((t) => user = t), (0, rxjs_1.tap)((m) => console.log(m)), (0, operators_1.mergeMap)((m) => (0, rxjs_1.from)(bcrypt_1.default.compare(password, m.password))), (0, operators_1.mergeMap)((m) => {
            return user.verified ? (0, rxjs_1.of)(m) : (0, rxjs_1.throwError)(() => 401);
        }), (0, operators_1.mergeMap)((m) => m ? (0, rxjs_1.of)({ token: (0, authontication_1.createUserToken)(Object.assign({}, user)), id: user._id }) : (0, rxjs_1.throwError)(() => 400)));
    }
}
exports.LoginController = LoginController;
