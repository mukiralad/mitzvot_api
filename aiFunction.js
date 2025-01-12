const { GoogleGenerativeAI } = require("@google/generative-ai");

require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = ``;

const load = async () => {
    try {
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();
        console.log(responseText);
    } catch (error) {
        console.error("Error generating content:", error);
    }
}

load();