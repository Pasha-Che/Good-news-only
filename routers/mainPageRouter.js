const express = require('express');
const { Op } = require('sequelize');
const { Entries } = require('../db/models');
const { checkSession } = require("../middleware/checkAuth");

const router = express.Router();

router.get('/', checkSession, (req, res) => {
  console.log(res.locals);
  res.render('mainPage', { userId: res.locals.userId });
});

// router.get('/', async (req, res) => {
//   const entries = await Entries.findAll();
//   res.render('mainPage', { entries });
//   console.log({ entries });
// });

router.route('/').post(async (req, res) => {
  if (!req.body.bwords) {
    req.body.bwords = 'fghjkl';
};
console.log(req.body.gwords.split(' ').map(el => `%${el}%`));
  try {
    const entries = await Entries.findAll({ where: {
      description: {
        [Op.iLike]: { [Op.any]: req.body.gwords.split(' ').map(el => `%${el}%`) },
        [Op.notILike]: `%${req.body.bwords}%`,
      }
    }});
    res.json(entries);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
