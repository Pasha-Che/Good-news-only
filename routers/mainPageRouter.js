const express = require('express');
const { Op } = require('sequelize');
const { Entries, Bwords, Gwords } = require('../db/models');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('mainPage');
});

router.get('/goodWords', async (req, res) => {
  const goodWords = await Gwords.findAll({ limit: 9 });
  res.json({goodWords});
});

// router.get('/', async (req, res) => {
//   const entries = await Entries.findAll();
//   res.render('mainPage', { entries });
//   console.log({ entries });
// });

router.route('/').post(async (req, res) => {
  if (!req.body.bwords) {
    req.body.bwords = 'fghjkl';
  }
  try {
    const entries = await Entries.findAll({
      where: {
        description: {
          [Op.iLike]: {
            [Op.any]: req.body.gwords.split(' ').map((el) => `%${el}%`),
          },
          [Op.notILike]: `%${req.body.bwords}%`,
        },
      },
    });

    const newGword = await Gwords.create({
      goodword: req.body.gwords,
      user_id: req.session.userId || 1,
    });



    res.json({ entries, newGword });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
