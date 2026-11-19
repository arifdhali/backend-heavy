import LoginController from "../controller/login.controller.js";

import { Router } from "express";
const authRoutes = Router();

authRoutes.post("/login", LoginController);

export default authRoutes;