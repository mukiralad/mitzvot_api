const { GoogleGenerativeAI } = require("@google/generative-ai");

require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


const load = async (prompt) => {
    try {
        const result = await model.generateContent(`Hi. Act as an official orthadox Rabbi, and only accept questions if they are surrounding the topic of Judaism. Here is my question: ${prompt}`);
        const responseText = await result.response.text();
        console.log(responseText);
        return responseText;
    } catch (error) {
        console.error("Error generating content:", error);
    }
}

module.exports = {  
    load
}