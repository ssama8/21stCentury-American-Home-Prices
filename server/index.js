const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/', () => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
