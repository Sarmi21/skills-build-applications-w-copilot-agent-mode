import { Router } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const router = Router();

const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', apiUrl: apiBaseUrl });
});

router.get('/users/', async (_req, res) => {
  const users = await User.find({}).lean();
  res.json({ resource: 'users', data: users });
});

router.get('/teams/', async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json({ resource: 'teams', data: teams });
});

router.get('/activities/', async (_req, res) => {
  const activities = await Activity.find({}).populate('userId').lean();
  res.json({ resource: 'activities', data: activities });
});

router.get('/leaderboard/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).populate('userId').lean();
  res.json({ resource: 'leaderboard', data: leaderboard });
});

router.get('/workouts/', async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json({ resource: 'workouts', data: workouts });
});

export default router;
