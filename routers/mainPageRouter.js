const express = require('express');
const { Op } = require('sequelize');
const { Entries } = require('../db/models');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('mainPage');
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
