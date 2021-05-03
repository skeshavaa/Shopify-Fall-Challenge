const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth')
var upload = require('../api/file-upload')
const vision = require('@google-cloud/vision')
const Image = require('../../models/image')
const user = require('../../models/user');


const singleImage = upload.single('image')
const queryImage = upload.single('queryImage')
const client = new vision.ImageAnnotatorClient({
    keyFilename: 'vision-auth.json'
});

// REQUEST: GET
// GETS ALL PUBLIC IMAGES
router.get('/getImages', (req, res) => {
    Image.find({}).then((images) => {
        const results = []

        images.map((image) => {
            if (image.public){
                results.push(image)
            }
        })

        return res.status(200).json({status: "success", results: results})
    })

    //return res.status(400).json({status: "failure", msg: "Something's gone wrong"})
})

// REQUEST: GET
// GETS IMAGES FROM IMAGE REPO BASED ON QUERYTEXT
router.get('/searchByText', (req, res) => {
    if (!req.header('queryText')){
        return res.status(200).json({status: "failure", msg: "No queryText header provided"})
    }
    const queryTags = req.header('queryText').split(",")
    const results = []

    Image.find({}).then((images) => {
        
        for (var i = 0; i < images.length; i++){
            for (var j = 0; j < queryTags.length; j++){
                if ((images[i].tags.includes(queryTags[j]) || images[i].name.includes(queryTags[j])) && images[i].public == true){
                    results.push(images[i])
                    break;
                }
            }
        }

        return res.status(200).json({status: "success", results: results})
    })
})

// REQUEST: GET
// GETS IMAGES BASED ON QUERYIMAGE
router.get('/searchByImage', (req, res) => {

    queryImage(req, res, function () {
        const url = req.file.location
        const results = []
        client.labelDetection(url).then(visionResults => {
            const labels = visionResults[0].labelAnnotations;
            
            var filteredLabels = labels.filter((label) => label.score > 0.8);
            const queryTags = []
            filteredLabels.map((tag) => {
                queryTags.push(tag.description)
            })
            console.log(queryTags)

            Image.find({}).then((images) => {
        
                for (var i = 0; i < images.length; i++){
                    for (var j = 0; j < queryTags.length; j++){
                        if ((images[i].tags.includes(queryTags[j]) || images[i].name.includes(queryTags[j])) && images[i].public == true){
                            results.push(images[i])
                            break;
                        }
                    }
                }
        
                return res.status(200).json({status: "success", results: results})
            })
        })
    })
})

// REQUEST: POST
// ADDS IMAGE TO IMAGE REPOSITORY
router.post('/addImage', auth, async (req, res) => {
    //Get Tags and name from request header
    var tags = req.header('tags') ? req.header('tags').toString().split(",") : [];
    const name = req.header('name') ? req.header('name').toString() : "";
    const public = req.header('public') ? req.header('public').toLowerCase() == "true" : false;
        
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
                        postedBy: postedBy,
                        public
                    })

                    //Saving image then updating user with newly uploaded url
                    newImage.save().then((res) => {
                        const updatedUploads = []
                        uploads.forEach((uploadedImage) => {
                            updatedUploads.push(uploadedImage)
                        })
                        updatedUploads.push(res._id)
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