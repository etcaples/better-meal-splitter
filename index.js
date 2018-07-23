const express = require('express'); // TODO: require this as a dependency
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());
// app.use('/', path.join(_dirName, ''));

app.listen(PORT, () => console.log(`listening on port ${PORT}`));