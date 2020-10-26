import { Router } from "express";
import SoundtrackTemperature from "@src/controllers/SoundtrackTemperature";

const router = Router();

router.post("/soundtrack", SoundtrackTemperature.create);

export default router;
