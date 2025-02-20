const express = require('express');
const URL = require('./models/url')
const path = require('path')
const staticRoute = require('./routes/staticRouter')
const urlRoute = require('./routes/url')
const { connectToMongoDB } = require('./connect');

const app = express();
const PORT = 8000;

connectToMongoDB('mongodb://localhost:27017/short-url').then(console.log("MongoDB connected successfully !!!"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))
app.use('/url', urlRoute)
app.use('/',staticRoute)

app.get('/test',async(req,res)=>{
    const allUrl = await URL.find({});
    return res.render('home',{
        urls: allUrl
    })
})

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId; // Extract shortId from params

    const entry = await URL.findOneAndUpdate(
        { shortId }, 
        {
            $push: {
                visiteHistoty: {
                    timeStamp: Date.now(),
                }
            }
        },
        { new: true }  // Ensure updated document is returned
    );

    // 🛑 Handle case when shortId is not found
    if (!entry) {
        return res.status(404).send("Short URL not found.");
    }

    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})
