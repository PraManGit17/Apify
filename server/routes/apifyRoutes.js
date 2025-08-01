
import express from 'express';
import { getUserActors, getactorsSchema, runActor } from '../controllers/apifyControllers.js';


const router = express.Router();

router.post('/actors', getUserActors);
router.post(`/get-schema`, getactorsSchema);
router.post(`/run-actors`, runActor);

export default router;
