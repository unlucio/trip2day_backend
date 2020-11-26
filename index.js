const express = require("express");
const app = express();
var cors = require("cors");
const port = 3001;
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const accounts = [
  { nickname: "nickname", password: "password" },
  { nickname: "aaaaaaa", password: "bbbbbb" },
  { nickname: "mariobiondi", password: "thisiswhatyouare" },
  { nickname: "accountbellissimo", password: "passwordok" },
];

app
  .route("/auth")
  .post((req, res) => {

    let response = accounts.some((account) => {
      return account.nickname === req.body.nickname &&
        account.password === req.body.password;
    });

    res.json({ authenticated: response });
    // res.json({ authenticated:  req.body.nickname });
  })
  .all((req, res) => {
    res.json({ error: "Unknown Method" });
  });

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
