/* eslint-disable quotes */
const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const morgan = require("morgan");
const hbs = require("hbs");
const path = require("path");
const cookieParser = require("cookie-parser");

const { checkSession } = require("./middleware/checkAuth");
const mainPageRouter = require("./routers/mainPageRouter");
const loginRouter = require("./routers/loginRouter");
const registrRouter = require("./routers/register");
const logOutRouter = require('./routers/logoutRouter');

const app = express();
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

hbs.registerPartials(path.join(process.env.PWD, "views", "partials"));

const sessionConfig = {
  name: 'auth',
  store: new FileStore(),
  key: "sid",
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  httpOnly: true,
  cookie: { expires: 24 * 60 * 60e3 },
};
app.use(session(sessionConfig));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(express.json());

app.use("/", mainPageRouter);
app.use("/login", loginRouter);
app.use('/', logOutRouter);
app.use("/registration", registrRouter);

app.use(cookieParser);
app.use(checkSession);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("vzleteli");
});
