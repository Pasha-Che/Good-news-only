const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const { Users } = require('../db/models');

router.get('/', async (req, res) => {
  res.render('register');
});
router.post('/', async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (email && name && password) {
      const hashPass = await bcrypt.hash(password, Number(process.env.SALTROUNDS));
      await Users.create({ email, name, password: hashPass });
      req.session.userId = 1;
      res.redirect('/');
    }
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

router.get('/login', async (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await Users.findOne({
        where:
          { email },
      });
      const passCheck = await bcrypt.compare(password, user.password);
      if (user && passCheck) {
        req.session.userId = user.id;
        res.redirect('/');
      } else { res.redirect('/login'); }
    }
  } catch (err) {
    console.log(err);
    res.redirect('/login');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }
    res.clearCookie('auth').redirect('/');
  });
});

module.exports = router;
