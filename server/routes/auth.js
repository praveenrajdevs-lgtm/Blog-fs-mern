const express = require("express");
const authMiddleware = require("../middlewares/auth");
const { Register, Login, getMe } = require("../controllers/auth");

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/me", authMiddleware, getMe);

module.exports = router;
