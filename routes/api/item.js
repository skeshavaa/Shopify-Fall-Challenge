const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth')
var upload = require('../api/file-upload')
const vision = require('@google-cloud/vision')
const Image = require('../../models/image')
const user = require('../../models/user');


const singleImage = upload.single('image')
const client = new vision.ImageAnnotatorClient({
    keyFilename: 'vision-auth.json'
});

router.post('/addImage', auth, async (req, res) => {
    //Get Tags and name from request header
    var tags = req.header('tags') ? req.header('tags').toString().split(",") : [];
    const name = req.header('name') ? req.header('name').toString() : "";
    var url;

    singleImage(req, res, function () {
        //URL of uploaded image
        url = req.file.location

        //Getting attributed from Image from google vision API
        client.labelDetection(url).then(results => {
            const labels = results[0].labelAnnotations;

            //Creating array of attributes from user provided and API provided attributes
            for (var i = 0; i < labels.length; i++) {
                if (labels[i].score < 0.8) {
                    break;
                }
                if (!tags.includes(labels[i].description)) {
                    tags.push(labels[i].description)
                }
            }

            //Construction image to save in mongoDB
            var postedBy = "";
            var uploads;
            
            //Getting user that is posting image's information
            user.findById(req.user.id)
                .select('-password')
                .then(poster => {
                    postedBy = poster.email
                    uploads = poster.uploads
                    //Creating new image with url and user's info
                    const newImage = new Image({
                        name,
                        tags,
                        url,
                        postedBy: postedBy
                    })

                    //Saving image then updating user with newly uploaded url
                    newImage.save().then((res) => {
                        const updatedUploads = []
                        uploads.forEach((uploadedImage) => {
                            updatedUploads.push(uploadedImage)
                        })
                        updatedUploads.push(url)
                        user.findByIdAndUpdate(req.user.id, {uploads: updatedUploads}).then((res) => console.log(res)).catch(err => console.log(err))
                    })

                    //Returning image that was posted
                    return res.json({
                        name,
                        tags,
                        url,
                        postedBy
                    })
                })

            

        }).catch(err => console.log(err))

        // //return res.json({ imageurl: req.file.location })
    })





})


module.exports = router;