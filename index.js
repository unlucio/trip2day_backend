const express = require("express");
const app = express();
var cors = require("cors");
const port = 3001;
const bodyParser = require("body-parser");

app.use(cors());

app
  .route("")
  .get((req, res) => {
   
    res.json();
  })
  .post((req, res) => {
   
    res.json();
  })
  .all((req, res) => {
    res.json({ error: "Unknown Method" });
  });



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});