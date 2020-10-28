const moment = require('moment')

const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const keys = require('../config/keys');

const spacesEndpoint = new aws.Endpoint('fra1.digitaloceanspaces.com');
const s3 = new aws.S3({
    endpoint: spacesEndpoint,
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey
});

const storage = multerS3({
    s3: s3,
    bucket: (request, file, cb) => {
        cb(null, `${keys.doBucketPath}/${file.restaurantId}`)
    },
    acl: 'public-read',
    key: (request, file, cb) => {
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null, `${date}-${file.originalname}`)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
    }
}

const limits = {
    fileSize: 1024 * 1024 * 5
}

module.exports = multer({storage: storage, fileFilter, limits})

module.exports.deleteImageFromS3 = async function (fileLocation, restaurantId) {
    const bucket = `${keys.doBucketPath}/${restaurantId}`;
    const path = `/shops/${restaurantId}/`;
    const idx = fileLocation.indexOf(path);
    const fileName = fileLocation.substring(idx + path.length);

    await s3.deleteObject({
        Bucket: bucket,
        Key: fileName
    }, function (err, data) {
        if (err) {
            new Error('Error during delete image from s3 bucket in DO!');
        }
    })
}
