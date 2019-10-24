const express = require('express');
const router = express.Router();

const db = require('monk')(process.env.MONGO_URI)


/* This route pulls in the entire collection tree for display and can be searched
  by TitleName or ReleaseYear although I didn't have enough time to implement both on the front end
*/
router.get('/', (req, res) => {
  const titlesCollection = db.get('Titles');
  const {
    TitleName,
    ReleaseYear
  } = req.query;

  if (req.query) {
    if (req.query.TitleName) {
      titlesCollection.find({
        TitleName
      }).then((data) => {
        res.status(200).json(data)
      }).catch((err) => {
        res.status(500).json(err);
      })
    } else if (req.query.ReleaseYear) {
      titlesCollection.find({
        ReleaseYear: parseInt(ReleaseYear, 10)
      }).then((data) => {
        res.status(200).json(data)
      }).catch((err) => {
        res.status(500).json(err);
      })
    } else {
      titlesCollection.find({}).then(data => {
        res.status(200).json(data);
      }).catch((err) => {
        res.status(500).json(err);
      })
    }
  }


})

module.exports = router;