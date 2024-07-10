const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

app.get('/api/user/:id', async (req, res) => {
    const userId = req.params.id;
    const token = process.env.DISCORD_BOT_TOKEN;

    try {
        const response = await axios.get(`https://discord.com/api/v9/users/${userId}`, {
            headers: {
                Authorization: `Bot ${token}`
            }
        });
        const data = response.data;
        const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${data.avatar}.png`;
        res.json({ avatarUrl });
    } catch (error) {
        console.error('Failed to fetch user profile', error);
        res.status(500).json({ error: 'Failed to fetch user profile' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
