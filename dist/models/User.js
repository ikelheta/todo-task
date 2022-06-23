"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(o) {
        this.verified = false;
        o = o ? o : {};
        this.name = o.name;
        this.email = o.email;
        this.password = o.password;
    }
}
exports.User = User;
