const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const { ID, SECRET } = require('../.././config')

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        bucket: "keshavaashopifyfallchallenge",
        metadata: function (req, file, cb) {
            cb(null, {fieldName: 'testingmetadata'});
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload;