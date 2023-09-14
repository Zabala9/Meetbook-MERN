const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-provider-ini");
const multer = require("multer");

// create an S3 client instance
const s3Client = new S3Client({
    region: "us-west-1",
    credentials: fromIni({ profile: "Zabala88" }),
});

// name of the S3 bucket
const NAME_OF_BUCKET = "meetbook-mern";

// Function to upload a single file to S3
const singleFileUpload = async ({ file, public = false, }) => {
    const { originalname, buffer } = file;
    const path = require("path");

    const Key = new Date().getTime().toString() + path.extname(originalname);
    const uploadParams = {
        Bucket: NAME_OF_BUCKET,
        Key: public ? `public/${Key}` : Key,
        Body: buffer,
    };

    try {
        const uploadCommand = new PutObjectCommand(uploadParams);
        const result = await s3Client.send(uploadCommand);
        return public ? result.Location : result.Key;
    } catch (error) {
        console.error("Error uploading file to S3: ", error);
        throw error;
    }
};

// Function to upload multiple file to S3
const multipleFilesUpload = async ({ files, public = false }) => {
    return await Promise.all(
        files.map((file) => {
            return singleFileUpload({ file, public });
        })
    );
};

// Function to retrieve a private file from S3
const retrievePrivateFile = (key) => {
    if(key){
        const getObjectParams = {
            Bucket: NAME_OF_BUCKET,
            Key: key,
        };
        const GetObjectCommand = new GetObjectCommand(getObjectParams);
        return s3Client.getSignedUrlPromise(GetObjectCommand);
    }
    return key;
};

// Multer configuration
const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, "");
    },
});

const singleMulterUpload = (nameOfKey) => multer({ storage: storage }).single(nameOfKey);
const multipleMulterUpload = (nameOfKey) => multer({ storage: storage }).array(nameOfKey);

module.exports = {
    s3Client,
    singleFileUpload,
    multipleFilesUpload,
    retrievePrivateFile,
    singleMulterUpload,
    multipleMulterUpload,
};


//                                      AWS SDK for JavaScript (v2) bellow
// ---------------------------------------------------------------------------------------------------------------------------------------

// const AWS = require("aws-sdk");
// const multer = require("multer");
// const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
// const NAME_OF_BUCKET = "meetbook-mern";

// const singleFileUpload = async ({ file, public = false }) => {
//     const { originalname, buffer } = file;
//     const path = require("path");

//     const Key = new Date().getTime().toString() + path.extname(originalname);
//     const uploadParams = {
//         Bucket: NAME_OF_BUCKET,
//         Key: public ? `public/${Key}` : Key,
//         Body: buffer
//     };
//     const result = await s3.upload(uploadParams).promise();

//     return public ? result.Location : result.Key;
// };

// const multipleFilesUpload = async ({files, public = false}) => {
//     return await Promise.all(
//         files.map((file) => {
//             return singleFileUpload({file, public});
//         })
//     );
// };

// const retrievePrivateFile = (key) => {
//     let fileUrl;
//     if (key) {
//         fileUrl = s3.getSignedUrl("getObject", {
//             Bucket: NAME_OF_BUCKET,
//             Key: key
//         });
//     }
//     return fileUrl || key;
// };

// const storage = multer.memoryStorage({
//     destination: function (req, file, callback) {
//         callback(null, "");
//     },
// });

// const singleMulterUpload = (nameOfKey) => 
//     multer({ storage: storage }).single(nameOfKey);
// const multipleMulterUpload = (nameOfKey) => 
//     multer({ storage: storage }).array(nameOfKey);

// module.exports = {
//     s3,
//     singleFileUpload,
//     multipleFilesUpload,
//     retrievePrivateFile,
//     singleMulterUpload,
//     multipleMulterUpload
// };