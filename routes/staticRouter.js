const express = require('express');
const URL = require('../models/url')
const router = express.Router()
router.get('/',async(req,res)=>{
    const allUrl = await URL.find({})
    res.render('home',{ urls: allUrl})
})
module.exports = router;