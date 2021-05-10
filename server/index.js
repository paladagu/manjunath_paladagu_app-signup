const express = require('express');
const app = express();
const Proxy = require('./proxy');

// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` **before** your route handlers!
app.use(express.json());

Proxy.register(app);

app.use('/', express.static('build'));

app.listen(4000);
