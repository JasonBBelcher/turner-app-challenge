const express = require('express');
const router = express.Router();

const db = require('monk')(process.env.MONGO_URI)


/* GET title listing. */

router.get('/', (req, res) => {
  const titles = db.get('Titles');

  if (req.query) {
    if (req.query.TitleName) {
      titles.find({
        TitleName: req.query.TitleName
      }).then((data) => {
        res.status(200).json(data)
      }).catch((err) => {
        res.status(500).json(err);
      })
    } else {
      titles.find({}).then(data => {
        res.status(200).json(data);
      }).catch((err) => {
        res.status(500).json(err);
      })
    }
  }


})

module.exports = router;