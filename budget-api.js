const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

let envelopes = [];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Welcome to the Envelope Budget API!'));

app.post('/envelope', (req, res) => {
    const envelope = req.body;

    console.log(envelope);
    envelopes.push(envelope);

    res.send('Envelope is added to the budget.');
});

app.get('/envelopes', (req, res) => {
    res.json(envelopes);

    res.status(404).send('Envelopes not found');
})

app.get('/envelopes/:id', (req, res) => {
    const id = req.params.id;

    for (let envelope of envelopes) {
        if (envelope.id === id) {
            res.json(envelope);
            return;
        }
    }

    res.status(404).send('Envelope not found');
});

app.delete('/envelopes/:id', (req, res) => {
    const id = req.params.id;

    envelopes = envelopes.filter(i => {
        if (i.id !== id) {
            return true;
        }
        return false;
    });

    res.send('Envelope is deleted!');
});

app.post('/envelopes/:id', (req, res) => {
    const id = req.params.id;
    const newEnvelope = req.body;

    for (let i = 0; i < envelopes.length; i++) {
        let envelope = envelopes[i]
        if (envelope.id === id) {
            envelopes[i] = newEnvelope;
        }
    }

    res.send('Envelope is edited!');

});

app.listen(port, () => console.log(`Budget Envelope API listening on port ${port}!`));