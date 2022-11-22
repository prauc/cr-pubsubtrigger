// Copyright 2020 Google LLC. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file.

// [START cloudrun_pubsub_server_setup]
// [START run_pubsub_server_setup]
const express = require('express');
const app = express();

app.use(express.json());

app.post('/', (req, res) => {
    if (!req.body || !req.body.message) {
        const msg = 'no Pub/Sub message received';
        console.error(`error: ${msg}`);
        res.status(400).send(`Bad Request: ${msg}`);
        return;
    }

    const pubSubMessage = req.body.message;
    const name = pubSubMessage.data
        ? Buffer.from(pubSubMessage.data, 'base64').toString().trim()
        : 'World';

    console.log(`Hello ${name}!`);
    res.status(204).send();
});

const port = parseInt(process.env.PORT) || 8080;
    app.listen(port, () => {
    console.log(`helloworld: listening on port ${port}`);
});
// [END run_helloworld_service]
// [END cloudrun_helloworld_service]

// Exports for testing purposes.
module.exports = app;