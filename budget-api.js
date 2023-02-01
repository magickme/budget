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
            envelopes[i] = {...envelope, ...newEnvelope};
            res.send('Envelope is edited!');
            return;
        }
    }
        
    res.status(404).send('Envelope not found');
});

app.post('/envelopes/transfer/:from/:to', (req, res) => {
    const from = req.params.from;
    const to = req.params.to;
    const value = req.body.value;

    let fromEnvelope;
    let toEnvelope;

    for (let envelope of envelopes) {
        if (envelope.id === from) {
            fromEnvelope = envelope;
        }
        if (envelope.id === to) {
            toEnvelope = envelope;
        }
    }

    fromEnvelope.balance = fromEnvelope.balance - value;
    toEnvelope.balance = toEnvelope.balance + value;

    res.send('Envelopes are successfully updated!');
});

app.listen(port, () => console.log(`Budget Envelope API listening on port ${port}!`));