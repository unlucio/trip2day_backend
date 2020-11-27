const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cors = require("cors");
const port = 3001;
const bodyParser = require("body-parser");
const User = require("./user");

const app = express();

mongoose.connect("mongodb+srv://Sbodazo:admin@cluster0.2q3gi.mongodb.net/Users?retryWrites=true&w=majority",
{
  useNewUrlParser: true,
  useUnifiedTopology: true
},
() => {
  console.log("Database connesso");
});

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: "trip2day",
  resave: true,
  saveUninitialized: true
}))

app.use(cookieParser("trip2day"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

const accounts = [
  { nickname: "nickname", password: "password" },
  { nickname: "aaaaaaa", password: "bbbbbb" },
  { nickname: "mariobiondi", password: "thisiswhatyouare" },
  { nickname: "accountbellissimo", password: "passwordok" },
];

const planner = [
  {
    nickname: "nickname",
    planner: [
      {
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
      { nickname: "mario", img: "" },
      { nickname: "luigi", img: "" },
      { nickname: "wario", img: "" },
      { nickname: "waluigi", img: "" },
    ],
  },
];

app.post("/auth", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

app.post("/register", (req, res) => {
  User.findOne({username: req.body.username}, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User ({
        username: req.body.username,
        password: hashedPassword
      });
      await newUser.save();
      res.send("User Created");
    }
  });
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

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
