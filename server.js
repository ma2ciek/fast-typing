var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use('/lib', express.static('lib'));
app.use('/build', express.static('build'));
app.use('/css', express.static('css'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});