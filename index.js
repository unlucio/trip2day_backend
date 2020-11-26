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
    age: "30",
    from: "acquario di cattolica",
    img:
      "https://images.unsplash.com/photo-1495366691023-cc4eadcc2d7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",

    planner: [
      {
        where: "London",
        img:
          "https://images.unsplash.com/photo-1473896100090-53523650d4c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80",
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
        myPlan: [
          {
            name: "London Eye",
            fromWhen: 10,
            toWhen: 12,
            description: "bella ma non ci vivrei",
          },
        ],
      },
    ],
    friendList: [
      { nickname: "mario", img: "https://nintendoomed.it/wp-content/uploads/2018/10/mario.0.jpg" },
      { nickname: "luigi", img: "https://i.etsystatic.com/11355950/r/il/16ad26/1259915155/il_570xN.1259915155_jheb.jpg" },
      { nickname: "wario", img: "https://i.pinimg.com/originals/56/5e/27/565e27de74219823cb47c0eddcbf5f4a.jpg" },
      { nickname: "waluigi", img: "https://assets.change.org/photos/4/qh/tq/wAQHtqjWnDybkjQ-800x450-noPad.jpg?1521521140" },
    ],
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
    let userplanner = planner.find((userplanner) => {
      return req.params.nickname === userplanner.nickname;
    });
    let response = userplanner.planner.find((planner) => {
      return planner.where === req.params.where;
    });
    res.json(response);
  })
  .post((req, res) => {
    res.json();
  })
  .all((req, res) => {
    res.json({ error: "Unknown Method" });
  });

app
  .route("/:nickname")
  .get((req, res) => {
    let userplanner = planner.find((userplanner) => {
      return req.params.nickname === userplanner.nickname;
    });

    res.json(userplanner);
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
