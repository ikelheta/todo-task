"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createUserToken = exports.createToken = exports.isTokenValid = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const isTokenValid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (token) {
            const payload = jwt.verify(token, process.env.JWT_SECRET || "secret");
            const t = { id: payload.id, type: payload.type, email: payload.email };
            req.user = t;
            next();
        }
        else {
            res.sendStatus(401);
        }
    }
    catch (error) {
        res.status(401).json({ error });
    }
});
exports.isTokenValid = isTokenValid;
//--------------------------------------------------------------------------------------------------------------------------------------------------------
const createToken = (user) => {
    const id = user._doc._id;
    const type = user.type;
    const email = user._doc.email;
    return jwt.sign({ id, email, type }, process.env.JWT_SECRET || "secret", {
        expiresIn: '30d',
    });
};
exports.createToken = createToken;
//--------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------  //--------------------------------------------------------------------------------------------------------------------------------------------------------
const createUserToken = (user) => {
    const id = user._doc._id;
    const email = user._doc.email;
    return jwt.sign({ id, email }, process.env.JWT_SECRET || "secret", {
        expiresIn: '30d',
    });
};
exports.createUserToken = createUserToken;
//--------------------------------------------------------------------------------------------------------------------------------------------------------
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.params.token;
        if (token) {
            const payload = jwt.verify(token, process.env.JWT_SECRET || "secret");
            const t = { id: payload.id, email: payload.email };
            req.user = t;
            next();
        }
    }
    catch (error) {
        res.status(401).json({ error });
    }
});
exports.verifyToken = verifyToken;
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM…TQ3fQ.EDVsfs6aqY_hJGZvcq-1fIJTpnK08E3NAjap7qAOvvw
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2ZjMDdmMGFjODY1YzBkOTdkYTU5NyIsImVtYWlsIjoidGVzdDIyMEB5YWhvby5jb20iLCJ0eXBlIjoiZW1wbG95ZWVyIiwiaWF0IjoxNjQ4MzQ1MjE1LCJleHAiOjE2NTA5MzcyMTV9.MPszc8CyhHuqUOgTeMxjWzAULu9heDhXeYZ9EjL_A9s
