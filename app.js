const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const port = process.env.PORT || 3000;

const {toEnglish} = require('./util/hebrewToEnglishFunction');
const { load } = require('./aiFunction');
const { getRandomSection } = require('./util/tanakhUtilFunction');

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

app.get('/api/tanakh/random', (req, res) => {
    res.json(getRandomSection());
});

app.get('/api/tanakh/random/english', (req, res) => {
    const section = getRandomSection();
    toEnglish(section.line).then(english => {
        res.json({
            book: section.book,
            line: section.line,
            english
        });
    });
});

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

app.use(express.json()); // Add this line to parse JSON bodies

app.get('/api/ai', async (req, res) => {
    // Getting prompt from request body.. This will be added onto the prompt in the load function (AiFunction.js), which is "Hi. Act as an official orthadox Rabbi, and only accept questions if they are surrounding the topic of Judaism. Here is my question: "
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).send({ error: 'Body parameter "prompt" is required' });
    }
    const response = await load(prompt);
    console.log(response);
    res.send(response);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});