"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectionString = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const connectDatabase = async () => {
    await mongoose_1.default.connect(connectionString);
};
exports.connectDatabase = connectDatabase;
exports.default = mongoose_1.default.connection;
