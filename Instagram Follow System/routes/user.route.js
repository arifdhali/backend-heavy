const express = require('express');
const { Login, Follow } = require('../controllers/User');
const authMiddleware = require('../middleware/auth');

const UserRoutes = express.Router();


UserRoutes.post("/login", Login);
UserRoutes.post("/:user_id/follow", authMiddleware, Follow);




module.exports = UserRoutes;