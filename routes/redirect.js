const express = require('express');
const router = express.Router();
const URL = require('../models/UrlModel');

router.get('/:short_url', async function (req, res) {
  try {
    const urlParams = await URL.findOne({
      short_url: req.params.short_url
    })
    if (urlParams) {
      return res.redirect(urlParams.original_url)
    }
    else {
      return res.status(404).json('No URL found')
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
})

module.exports = router