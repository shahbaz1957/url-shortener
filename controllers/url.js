const shortid = require('shortid');
const URL = require('../models/url')

async function handleGenerateNewShortURL(req,res){
    const body = req.body;    //http//:google.com

    const shortID = shortid.generate();
    if(!body.url) return res.status(404).json({error:'rul requied'})
    await URL.create({
        shortId :shortID,
        redirectURL:body.url,
        visiteHistoty :[]
    })
    return res.json({ id:shortID})
 }

 async function handleGetAnalatics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId})
    return res.json({totalsClicks: result.visiteHistoty.length, analytics: result.visiteHistoty});
 }

 module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalatics
 }