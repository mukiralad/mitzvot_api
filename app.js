const express = require('express');
const app = express();
const port = 3000;

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

app.get('/api/mitzvot/source', (req, res) => {
    const sourceQuery = req.query.source;
    if (!sourceQuery) {
        return res.status(400).send({ error: 'Query parameter "source" is required' });
    }

    const results = mitzvot.filter(mitzvah => mitzvah.source.toLowerCase().includes(sourceQuery.toLowerCase()));
    res.json(results);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});