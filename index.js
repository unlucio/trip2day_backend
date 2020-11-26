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

const planner = [
  {
    nickname: "nickname",
    planner:[ {
      where: "London",
      fromWhen: "",
      toWhen: "",
      textRequest: "voglio andare in posti bellissimi",
      response: [
        {
          fromWho: "gianni",
          name: "Ristorante Pensavo Peggio",
          category: "restaurant",
          description: "fa schifo come te",
          cost: "$$$$",
          timeNeeded: 2,
          photoUrl: "",
        },
      ],
      savedResponse: [
        {
          fromWho: "gianni",
          name: "Ristorante Pensavo Peggio",
          category: "restaurant",
          description: "fa schifo come te",
          cost: "$$$$",
          timeNeeded: 2,
          photoUrl: "",
        },
      ],
      myPlan: [{ name: "London Eye", fromWhen: 10, toWhen: 12, description:'bella ma non ci vivrei' }],
    },]
  },
];

app
  .route("/auth")
  .post((req, res) => {
    let response = accounts.some((account) => {
      return (
        account.nickname === req.body.nickname &&
        account.password === req.body.password
      );
    });

    res.json({ authenticated: response });
  })
  .all((req, res) => {
    res.json({ error: "Unknown Method" });
  });

app
  .route("/:nickname/planner/:where")
  .get((req, res) => {
    let userplanner = planner.find((userplanner)=>{return req.params.nickname === userplanner.nickname});
    let response = userplanner.planner.find((planner)=>{return planner.where === req.params.where})
    res.json(response);
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
