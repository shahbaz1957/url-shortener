const  express = require('express');
const router = express.Router();
const {handleGenerateNewShortURL,handleGetAnalatics} = require('../controllers/url')

router.post('/',handleGenerateNewShortURL);
router.get('/analytics/:shortId',handleGetAnalatics);

module.exports = router;