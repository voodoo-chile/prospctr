const express = require('express');
const router = express.Router();

const Contact = require('../../models/contacts')

/* GET api listing.
router.get('/', (req, res, next) => {
  res.send('contacts works');
});
*/

router.post('/', function (req, res, next) {
  var contact = new Contact({
    name: req.body.name
  });
  contact.save(function(err, result) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    res.status(201).json({
      message: 'Saved contact',
      obj: result
    });
  });
});

module.exports = router;