const express = require('express');
const cors = require('cors');
const setupRoutes = require('./routers/indexRouter');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// links of all routes to app.js
setupRoutes(app);

app.listen(port, () => {
  console.log(`Server run on ${port}`);
});
