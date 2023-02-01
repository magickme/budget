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

    // Only send the response once
    if (!res.headersSent) {
        res.send('Envelope is added to the budget.');
    }
});

app.get('/envelopes', (req, res) => {
    // Only send the response once
    if (!res.headersSent) {
        res.json(envelopes);
    }
    
    res.status(404).send('Envelopes not found');
})

app.get('/envelopes/:id', (req, res) => {
    const id = req.params.id;

    for (let envelope of envelopes) {
        if (envelope.id === id) {
            // Only send the response once
            if (!res.headersSent) {
                res.json(envelope);
            }
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

    // Only send the response once
    if (!res.headersSent) {
        res.send('Envelope is deleted!');
    }

});

app.post('/envelopes/:id', (req, res) => {
    const id = req.params.id;
    const newEnvelope = req.body;

    for (let i = 0; i < envelopes.length; i++) {
        let envelope = envelopes[i]
        if (envelope.id === id) {
            envelopes[i] = {...envelope, ...newEnvelope};
            // Only send the response once
            if (!res.headersSent) {
                res.send('Envelope is edited!');
            }
            return;
        }
    }
        
    res.status(404).send('Envelope not found');
});

app.post('/envelopes/transfer/:from/:to', (req, res) => {
    const fromId = req.params.from;
    const toId = req.params.to;
    let fromIndex = -1;
    let toIndex = -1;

    // Find envelope indexes
    for (let i = 0; i < envelopes.length; i++) {
        let envelope = envelopes[i]
        if (envelope.id === fromId) {
            fromIndex = i;
        } else if (envelope.id === toId) {
            toIndex = i;
        }
    }

    // Transfer value
    if (fromIndex > -1 && toIndex > -1) {
        const fromEnvelope = envelopes[fromIndex];
        const toEnvelope = envelopes[toIndex];
        const fromValue = fromEnvelope.title;
        const toValue = toEnvelope.title;

        envelopes[fromIndex] = { ...fromEnvelope, title: toValue };
        envelopes[toIndex] = { ...toEnvelope, title: fromValue };
        // Only send the response once
        if (!res.headersSent) {
            res.send('Value is transferred!');
        }
    } else {
        res.status(404).send('Envelopes not found');
    }
});

app.listen(port, () => console.log(`Budget Envelope API listening on port ${port}!`));