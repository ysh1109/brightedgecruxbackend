import { Router } from "express";
import { handleGetCrux } from "../controllers/crux.controller";

const router = Router()

router.post("/getCrux", handleGetCrux);

export default router;