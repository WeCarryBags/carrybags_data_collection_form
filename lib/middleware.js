import nextConnect from 'next-connect';
import fileUpload from 'express-fileupload';

const middleware = nextConnect()

middleware.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    limits: { fileSize: 50 * 1024 * 1024 },
}))

export default middleware