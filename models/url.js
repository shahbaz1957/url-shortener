const mongoose = require('mongoose')

const urlSchema  = new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type: String,
        required: true
    },
    visiteHistoty:[{timeStamp:{type:Number }}],
},{ timestamps:true})

const URL = mongoose.model('url', urlSchema);
module.exports = URL;


/*
 *** Mongoose mongoose.model() Function ***

    The mongoose.model() function of the mongoose module is used to create a collection of a particular database of MongoDB. The name of the collection created by the model function is always in plural format mean GFG to gfss and the created collection imposed a definite structure.

    Syntax: mongoose.model(<Collectionname>, <CollectionSchema>)
    Parameters: This function accepts the following two parameters:

    ## Collection name: It is the name of the collection.
    ## Collection Schema: It is the schema of the collection.
        Return type: This function returns the Mongoose object.
*/
