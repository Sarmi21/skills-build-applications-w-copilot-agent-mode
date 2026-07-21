import mongoose, { Schema, model, type Model, type Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  age: number;
  fitnessGoal: string;
  city: string;
}

export interface ITeam extends Document {
  name: string;
  sport: string;
  members: string[];
  goal: string;
}

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  distanceKm: number;
  date: Date;
}

export interface ILeaderboardEntry extends Document {
  userId: mongoose.Types.ObjectId;
  score: number;
  rank: number;
}

export interface IWorkout extends Document {
  name: string;
  category: string;
  difficulty: string;
  durationMinutes: number;
  focus: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: Number,
  fitnessGoal: String,
  city: String,
});

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  sport: String,
  members: [{ type: String }],
  goal: String,
});

const activitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: String,
  durationMinutes: Number,
  distanceKm: Number,
  date: { type: Date, default: Date.now },
});

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: Number,
  rank: Number,
});

const workoutSchema = new Schema<IWorkout>({
  name: String,
  category: String,
  difficulty: String,
  durationMinutes: Number,
  focus: String,
});

export const User: Model<IUser> = mongoose.models.User || model<IUser>('User', userSchema);
export const Team: Model<ITeam> = mongoose.models.Team || model<ITeam>('Team', teamSchema);
export const Activity: Model<IActivity> = mongoose.models.Activity || model<IActivity>('Activity', activitySchema);
export const LeaderboardEntry: Model<ILeaderboardEntry> = mongoose.models.LeaderboardEntry || model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
export const Workout: Model<IWorkout> = mongoose.models.Workout || model<IWorkout>('Workout', workoutSchema);
