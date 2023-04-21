const express = require("express");
const router = express.Router();

const { generateShortUrl } = require("../controllers/shortUrlController");
const { limiter, cacheMiddleware } = require("../middlewares/shortUrl");
const { authenticateToken } = require("../middlewares/auth");

router.post("/", authenticateToken, limiter, cacheMiddleware, generateShortUrl);

module.exports = router;
