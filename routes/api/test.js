const AWS = require('aws-sdk');
const fs = require('fs');

const uploadFile = (fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: "keshavaashopifyfallchallenge",
        Key: 'newcat.jpg', // File name you want to save as in S3
        Body: fileContent,
        ContentType: 'image/png'
    };

    const s3 = new AWS.S3({
        accessKeyId: "AKIAQLCIPQ3CUIIZL4U4",
        secretAccessKey: "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"
    });

    console.log(process.env.ID)

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

uploadFile("cat.jpg")