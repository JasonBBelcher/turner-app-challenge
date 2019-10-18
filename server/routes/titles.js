const express = require('express');
const router = express.Router();

const db = require('monk')(process.env.MONGO_URI)


/* GET title listing. */
// This route pulls in just the names of titles for autocomplete search box
// I could have done this on the front end but this was quicker to meet under a 1 day deadline.

router.get('/names', (req, res) => {
  const titlesCollection = db.get('Titles');
  titlesCollection.find({}).then((titles) => {
    const justTitleNames = titles.map((t) => {
      return t.TitleName;
    })
    res.status(200).json(justTitleNames)
  }).catch((err) => {
    res.status(500).json(err);
  })

})

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