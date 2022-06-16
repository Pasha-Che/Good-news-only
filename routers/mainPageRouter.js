const express = require('express');
const { Entries } = require('../db/models');

const router = express.Router();

// router.get('/', (req, res) => {
//   res.render('mainPage');
// });

router.get('/', async (req, res) => {
  const entries = await Entries.findAll();
  res.render('mainPage', { entries });
  console.log({ entries });
});



module.exports = router;
