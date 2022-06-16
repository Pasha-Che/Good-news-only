const express = require('express');

const router = express.Router();

const { Entries } = require('../db/models');

// router.get('/search', (req, res) => {
//   res.render('/searchResult');
// });

router.route('/').post(async (req, res) => {
  try {
    const entries = await Entries.findAll();
    res.json(entries);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
