"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const router = (0, express_1.Router)();
const getApiBaseUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : 'http://localhost:8000';
};
const apiBaseUrl = getApiBaseUrl();
router.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', apiUrl: apiBaseUrl });
});
router.get(['/users', '/users/'], async (_req, res) => {
    const users = await models_1.User.find({}).lean();
    res.json({ resource: 'users', data: users });
});
router.get(['/teams', '/teams/'], async (_req, res) => {
    const teams = await models_1.Team.find({}).lean();
    res.json({ resource: 'teams', data: teams });
});
router.get(['/activities', '/activities/'], async (_req, res) => {
    const activities = await models_1.Activity.find({}).populate('userId').lean();
    res.json({ resource: 'activities', data: activities });
});
router.get(['/leaderboard', '/leaderboard/'], async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntry.find({}).populate('userId').lean();
    res.json({ resource: 'leaderboard', data: leaderboard });
});
router.get(['/workouts', '/workouts/'], async (_req, res) => {
    const workouts = await models_1.Workout.find({}).lean();
    res.json({ resource: 'workouts', data: workouts });
});
exports.default = router;
