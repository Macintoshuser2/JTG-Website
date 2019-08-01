// Node.js Server for testing the website locally to ensure performance is good and to be able to perform audits within Chrom Dev Tools

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.send(__dirname + '/public/index.html'));

app.listen(8080, () => console.log('Server listening on port 8080'));
