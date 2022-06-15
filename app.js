const express = require('express');
// const session = require('express-session');
// const FileStore = require('session-file-store')(session);
const morgan = require('morgan');
const hbs = require('hbs');
const path = require('path');

const mainPageRouter = require('./routers/mainPageRouter');
const registrationRouter = require('./routers/registrationRouter');
const loginRouter = require('./routers/loginRouter');

const app = express();
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(process.env.PWD, 'views', 'partials'));

// const sessionConfig = {
//   store: new FileStore(),
//   key: 'sid',
//   secret: 'secret',
//   resave: false,
//   saveUninitialized: false,
//   httpOnly: true,
//   cookie: { expires: 24 * 60 * 60e3 },
// };
// app.use(session(sessionConfig));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(express.json());
app.use('/', mainPageRouter);
app.use('/registration', registrationRouter);
app.use('/login', loginRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log('vzleteli');
});
