const shortid = require('shortid');
const URL = require('../models/url')

async function handleGenerateNewShortURL(req,res){
    const body = req.body;    //http//:piyushgarg.dev

    const shortID = shortid.generate();
    if(!body.url) return res.status(404).json({error:'url requied'}) 
    await URL.create({
        shortId :shortID,
        redirectURL:body.url,
        visiteHistoty :[]
    })
    return res.render('home',{id: shortID })
    
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

 /*

    findOne in Mongoose
    findOne() is used when you want to retrieve a single document from a collection based on a specific condition, such as finding a user by their email or username.

 */