const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const port = process.env.PORT || 3000;

const { translateFunction} = require('./util/hebrewToEnglishFunction');
const { trimMarkdown } = require('./util/trimMarkdownFunction');
const { mitzvahSummary, explainMitzvah, aiSearch} = require('./aiFunction');

const { getRandomSection } = require('./util/tanakhUtilFunction');
const rateLimit = require('express-rate-limit');

// Rate limiting
// General rate limiter: 100 requests per hour per user
const generalLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 100, // limit each user to 100 requests per window
    message: { error: 'Too many requests from this user, please try again later.' },
    keyGenerator: (req) => {
        return req.ip; // This is the default keyGenerator, but you could customize it
    }
});

// AI rate limiter: 20 requests per hour per user
const aiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20, // limit each user to 20 requests per window
    message: { error: 'Too many AI requests from this user, please try again later.' },
    keyGenerator: (req) => {
        return req.ip; // This is the default keyGenerator, but you could customize it
    }
});

// Apply general limiter to all routes by default
app.use(generalLimiter);

app.use(cors()); // Enable CORS

const mitzvot = require('./mitzvot.json');

app.get('/api/mitzvot/all', (req, res) => {
    try{
        res.json(mitzvot);
    } catch (error){
        res.send({error: 'Error getting all mitzvot'});
    }
});

app.get('/api/mitzvot/ai/search', aiLimiter, async(req, res) => {
    //Search for Mitzvah using AI
    const query = req.query.q;
    if (!query) {
        return res.status(400).send({ error: 'Query parameter "q" is required' });
    }

    const results = await aiSearch(query);
    // console.log(trimMarkdown(results))
    res.json(trimMarkdown(results));
});

app.get('/api/mitzvot/search', async(req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).send({ error: 'Query parameter "q" is required' });
    }

    const results = mitzvot.filter(mitzvah => mitzvah.description.toLowerCase().includes(query.toLowerCase()));
    if (results.length === 0) {
        return res.status(404).send({ error: 'No mitzvot found, try our AI search.' });
    }
    res.json(results);
});

app.get('/api/tanakh/random', (req, res) => {

    try {
        res.json(getRandomSection());
    } catch (error) {
        res.status(500).send({ error: 'Error getting random section' });
    }
});

app.get('/api/tanakh/random/english', (req, res) => {
    const section = getRandomSection();
    translateFunction(section.line, 'iw', 'en').then(english => {
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

// parsing JSON bodies
app.use(express.json());

app.post('/api/mitzvot/ai', aiLimiter, async (req, res) => {
    // Requires JSON request body data to be present in form of { "prompt": "..." }
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).send({ error: 'Body parameter "prompt" is required' });
    }
    const response = await mitzvahSummary(prompt);
    // console.log(response);
    res.send(response);
});

app.get('/api/mitzvot/ai/explain/:id', aiLimiter, async (req, res)=>{
    const id = Number(req.params.id);
    if (id > 613 || id < 1) {
        return res.status(404).send({ error: 'Mitzvah not found. Remember, there are only 613 official Mitzvot!' });
    }
    const response = await explainMitzvah(id);

    if (response.error) {
        return res.status(404).send(response);
    }   
    //trimMarkdown just takes a JSON string and returns the parsed JSON object
    res.send(trimMarkdown(response));
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});