const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
const { OpenAI } = require("openai"); // Corrected import to require syntax

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.CHAT_API_KEY }); // Initialize OpenAI with API key

router.post('/canned', async (req, res) => {
    try {
        // Extract values from the JSON body
        const { systemMessage, userPrompt } = req.body;

        // Validate the request body
        if (!systemMessage || !userPrompt) {
            return res.status(400).json({ error: "systemMessage and userPrompt are required." });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Another model name: gpt-4
            messages: [
                { role: "system", content: systemMessage },  // Use systemMessage from JSON body
                { role: "user", content: userPrompt },        // Use userPrompt from JSON body
            ],
        });

        console.log('MSG: ' + completion.choices[0].message.content); // Corrected to access message content

        return res.json(completion.choices[0].message); // Return the message object
    } catch (error) {
        console.error("Error generating completion:", error);
        return res.status(500).json({ error: "An error occurred while generating the completion." });
    }
});

module.exports = router;

