const express = require('express')
const AWS = require('aws-sdk');
const router = express.Router();
const auth = require('../../middleware/auth')
const jwt = require('jsonwebtoken');
const multer = require('multer');
var upload = require('../api/file-upload')

const singleImage = upload.single('image')

router.post('/addImage', auth, (req, res) => {

   singleImage(req, res, function() {
       return res.json({imageurl: req.file.location})
   })
})


module.exports = router;