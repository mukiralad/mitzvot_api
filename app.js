const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors'); // Import the cors package
const app = express();
const port = process.env.PORT || 3000;



app.use(cors()); // Enable CORS

const mitzvot = require('./mitzvot.json');

app.get('/api/mitzvot/all', (req, res) => {
    res.json(mitzvot);
});

app.get('/api/mitzvot/search', (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).send({ error: 'Query parameter "q" is required' });
    }

    const results = mitzvot.filter(mitzvah => mitzvah.description.toLowerCase().includes(query.toLowerCase()));
    res.json(results);
});

app.get('/api/mitzvot/reccomendations', async(req, res) =>{
    if (req.query.prompt){
        const prompt = req.query.prompt
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
            res.json({
            message: result
        })       
    }
})


app.get('/api/mitzvot/source', (req, res) => {
    const sourceQuery = req.query.source;
    if (!sourceQuery) {
        return res.status(400).send({ error: 'Query parameter "source" is required' });
    }

    const results = mitzvot.filter(mitzvah => mitzvah.source.toLowerCase().includes(sourceQuery.toLowerCase()));
    res.json(results);
});

app.get('/api/mitzvot/random', (req, res)=>{
    const randomIndex = Math.floor(Math.random() * mitzvot.length);
    res.json(mitzvot[randomIndex]);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});