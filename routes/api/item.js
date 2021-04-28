const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth')
var upload = require('../api/file-upload')
const vision = require('@google-cloud/vision')


const singleImage = upload.single('image')
const client = new vision.ImageAnnotatorClient({
    keyFilename: 'vision-auth.json'
});

router.post('/addImage', auth, async (req, res) => {
    var url;
    singleImage(req, res, function () {
        url = req.file.location
        console.log(req.file.location)
        client.labelDetection(req.file.location).then(results => {
            const labels = results[0].labelAnnotations;

            labels.forEach((label) => console.log(label))
        }).catch(err => console.log(err))
        return res.json({ imageurl: req.file.location })
    })
})


module.exports = router;