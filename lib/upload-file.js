import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import fs from 'fs';

const s3 = new S3Client({
    region: 'eu-west-2',
    credentials: {
        accessKeyId: process.env.HUMZA_CB_AWS_ACCESS_ID,
        secretAccessKey: process.env.HUMZA_CB_AWS_SECRET_KEY
    }
})

export const uploadFile = async (file, path, BUCKET_NAME) => {
    //create stream for efficient uploading of large files

    //if a file has been uploaded, upload that; otherwise upload svg text
    const uploadFile = typeof file === 'object'
        ? fs.createReadStream(file.tempFilePath)
        : file

    //if a file has been uploaded, set mimetype to that; else, set it to svg file
    const mimeType = typeof file === 'object'
        ? file.mimetype
        : 'image/svg+xml'

    const fullFilePath = `${path}/${file.name}`

    //s3 parameters for storage
    const params = {
        Bucket: BUCKET_NAME,
        Key: fullFilePath,
        Body: uploadFile,
        ContentType: mimeType,
        ACL:'public-read' //public can read object
    };

    const upload = new Upload({
        client: s3,
        params: params
    })

    await upload.done()
    return `https://${BUCKET_NAME}.s3.eu-west-2.amazonaws.com/${fullFilePath}`
}
