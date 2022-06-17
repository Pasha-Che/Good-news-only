const express = require('express');
const bcrypt = require('bcrypt');
const { Users } = require('../db/models');
const { checkSession } = require('../middleware/checkAuth');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', checkSession, async (req, res) => {
  const { loginEmail, loginPassword } = req.body;
  const user = await Users.findOne({
    where: {
      email: loginEmail,
    },
  });

  const passChek = await bcrypt.compare(loginPassword, user.password);
  if (passChek) {
    req.session.userId = user.id;
    return res.sendStatus(200);
  } else {
      res.sendStatus(404)
  }

  console.log(user);
  res.end();
});

module.exports = router;
