const express = require('express');
const { connectToMongoDB } = require('./db');
const app = express();
require("dotenv").config()
connectToMongoDB()

const PORT = process.env.PORT || 8000

const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = express.Router();
const auth = require('./authentication/auth');
const taskModel = require("./models/task");
const taskRouter = require("./task/task.router");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser())
app.use("/users", userRouter)
app.use("/tasks", auth.ensureLogin, taskRouter)
app.use("/public", express.static("public"))

app.get('/', (req, res) => {
    res.render('index', { navs: ['guide', 'signup', 'dashboard'] });
});
app.get('/', (req, res) => {
   res.render('signup', { navs: ['guide', 'login'] });
});
app.get('/', (req, res) => {
   res.render('login', { navs: ['guide', 'signup'] });
});

app.get('/', auth.ensureLogin, async (req, res) => {
      const taskInfos = await taskModel.find({ user_id: res.locals.user._id })
   res.render("dashboard", {
       navs: ["CreateTask", "Guide", "Logout"], user: res.locals.user, taskInfos, date: new Date()
   });
});
app.get("/exitingUser", (req, res) => {
    res.render("existingUser", {
     navs: ["Signup", "Login"]
   });
 });

app.get("/errorUser", (req, res) => {
   res.render("errorUser", {
           navs: ["Signup"]
  });
});

app.get("/incorrect", (req, res) => {
   res.render("incorrect", {
   navs: ["Login", "Signup"]
  });
});


 app.get("/create_task", auth.ensureLogin, (req, res) => {
 res.render("create task", {
   navs: ["Dashboard", "Logout"], date: new Date()
   });
});

app.get("/guide", (req, res) => {
res.render("guide", {
navs: ["Signup", "Login", "Dashboard"]
    })
 })

app.get("*", (req, res) => {
  res.render("pageNotFound")
})


module.exports = app

app.listen(PORT, () => {
    console.log(`Server started on PORT: http://localhost:${PORT}`)
})