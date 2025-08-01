import express from 'express';
import {
  getUserActors,
  getActorSchema,  
  runActor,
  getRunStatus
} from '../controllers/apifyControllers.js';

const router = express.Router();

router.post('/actors', getUserActors);
router.post('/schema', getActorSchema);
router.post('/run', runActor);
router.post('/run-status', getRunStatus);

export default router;
