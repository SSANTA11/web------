let express = require('express');
let path = require('path');
let app = express();
let port = 8080;

app.use(express.static(__dirname));

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, "ajax.html"));
});

app.listen(port, function() {
    console.log(`★ server Running at http://127.0.0.1:${port}`);
});
