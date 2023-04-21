const rateLimit = require("express-rate-limit");
const Redis = require("ioredis");
const redisClient = new Redis();

const limiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
  }),
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 requests per windowMs
  message: "Too many requests from this IP, please try again in an hour",
});

const cacheMiddleware = (req, res, next) => {
  const redisKey = `shorturl:${req.body.url}`;
  redisClient.get(redisKey, (err, cachedUrl) => {
    if (err) {
      console.log(err);
      return next();
    }
    if (cachedUrl) {
      return res.status(200).json({ shortUrl: cachedUrl });
    }
    return next();
  });
};

module.exports = { limiter, cacheMiddleware };
