const express = require('express');
const validUrl = require('valid-url');
const shortid = require('shortid');
// express route handler
const router = express.Router();

//import url database model
const URL = require('../models/UrlModel');

router.post('/api/shorturl/', async function(req,res) {
    const url = req.body.url;
    const urlCode = shortid.generate()
    if (!validUrl.isWebUri(url)) {
        res.json({
            error: 'Invalid URL'
          })
    }
    else {
        try {
            let findOne = await URL.findOne({
                original_url: url
            })
            if (findOne) {
                res.json({
                    original_url: findOne.original_url,
                    short_url: findOne.short_url
                })
            }
            else{
                findOne = new URL({
                    original_url: url,
                    short_url: urlCode
                })
            await findOne.save()
            res.json({
                original_url: findOne.original_url,
                short_url:findOne.short_url
            })
            }
        }
        catch (err){
            console.log(err)
            res.status(500).json('Server Error')
        }
    }
})

module.exports = router