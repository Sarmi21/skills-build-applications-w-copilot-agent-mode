import mongoose from 'mongoose';

const connectionString = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export const connectDatabase = async () => {
  await mongoose.connect(connectionString);
};

export default mongoose.connection;
