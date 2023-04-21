
const ShortUrl = require("../models/shortUrl");
const User = require("../models/user");
const {nanoid} =require("nanoid")




const generateShortUrl = async (req, res) => {
    try {
        const { url } = req.body;
        let shortUrl;

        const existingShortUrl = await ShortUrl.findOne({ originalUrl: url });

        if (existingShortUrl) {
            shortUrl = existingShortUrl.shortUrl;
            const redisKey = `shorturl:${url}`;
            redisClient.set(redisKey, shortUrl, "EX", 60 * 60); // 1 hour
        } else {
            const newShortUrl = await ShortUrl.create({
                originalUrl: url,
                shortUrl: nanoid(6),
            });

            shortUrl = newShortUrl.shortUrl;
        }

        await User.findByIdAndUpdate(req.user.id, {
            $push: { urls: shortUrl },
        });

        return res.status(200).json({ shortUrl });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
};

module.exports = { generateShortUrl };
