"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const connectionString = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            models_1.User.deleteMany({}),
            models_1.Team.deleteMany({}),
            models_1.Activity.deleteMany({}),
            models_1.LeaderboardEntry.deleteMany({}),
            models_1.Workout.deleteMany({}),
        ]);
        const users = await models_1.User.insertMany([
            { name: 'Maya Chen', email: 'maya.chen@example.com', age: 29, fitnessGoal: 'Marathon prep', city: 'Seattle' },
            { name: 'Liam Ortiz', email: 'liam.ortiz@example.com', age: 34, fitnessGoal: 'Strength gain', city: 'Denver' },
            { name: 'Sofia Patel', email: 'sofia.patel@example.com', age: 27, fitnessGoal: 'Weight loss', city: 'Austin' },
        ]);
        await models_1.Team.insertMany([
            { name: 'Night Owls', sport: 'Running', members: ['Maya Chen', 'Liam Ortiz'], goal: 'Complete a relay event' },
            { name: 'Peak Performers', sport: 'CrossFit', members: ['Sofia Patel'], goal: 'Improve endurance' },
        ]);
        await models_1.Activity.insertMany([
            { userId: users[0]._id, type: 'Run', durationMinutes: 35, distanceKm: 5.2, date: new Date('2026-07-20') },
            { userId: users[1]._id, type: 'Strength', durationMinutes: 60, distanceKm: 0, date: new Date('2026-07-19') },
            { userId: users[2]._id, type: 'Cycling', durationMinutes: 45, distanceKm: 18, date: new Date('2026-07-18') },
        ]);
        await models_1.LeaderboardEntry.insertMany([
            { userId: users[0]._id, score: 980, rank: 1 },
            { userId: users[1]._id, score: 912, rank: 2 },
            { userId: users[2]._id, score: 901, rank: 3 },
        ]);
        await models_1.Workout.insertMany([
            { name: 'HIIT Circuit', category: 'Cardio', difficulty: 'Intermediate', durationMinutes: 30, focus: 'Fat burn' },
            { name: 'Upper Body Strength', category: 'Strength', difficulty: 'Beginner', durationMinutes: 40, focus: 'Muscle growth' },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
