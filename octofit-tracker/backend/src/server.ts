import express from 'express';
import mongoose from 'mongoose';
import apiRoutes from './routes/api';
import { connectDatabase } from './config/database';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());
app.use('/api', apiRoutes);

const startServer = async () => {
  try {
    await connectDatabase();
    console.log('MongoDB connected');
    app.listen(port, () => {
      const codespaceName = process.env.CODESPACE_NAME;
      const baseUrl = codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : `http://localhost:${port}`;
      console.log(`Backend listening on port ${port}`);
      console.log(`API base URL: ${baseUrl}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
};

startServer();
