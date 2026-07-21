"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./routes/api"));
const database_1 = require("./config/database");
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const getApiBaseUrl = (serverPort) => {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : `http://localhost:${serverPort}`;
};
app.use(express_1.default.json());
app.use('/api', api_1.default);
const startServer = async () => {
    try {
        await (0, database_1.connectDatabase)();
        console.log('MongoDB connected');
        app.listen(port, () => {
            const baseUrl = getApiBaseUrl(port);
            console.log(`Backend listening on port ${port}`);
            console.log(`API base URL: ${baseUrl}`);
        });
    }
    catch (error) {
        console.error('MongoDB connection failed', error);
        process.exit(1);
    }
};
startServer();
