import { getStep } from "@controllers/character/create/characterCreateController";
import express from "express";

const characterCreateRouter = express.Router();

console.log('000');
characterCreateRouter.post("/getStep", getStep);

export default characterCreateRouter;
