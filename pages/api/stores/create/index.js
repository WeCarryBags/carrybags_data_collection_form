import dbConnect from '../../../../lib/db-connect'
import nextConnect from 'next-connect';
import { DataModel } from '../../../../lib/data-model'
import middleware from '../../../../lib/middleware';
import { uploadFile } from '../../../../lib/upload-file';
import { getAddress } from '../../../../lib/get-address';
import { generateFormSubmittedEmail } from '../../../../lib/send-email';
import { fallbackFormSubmittedEmail } from '../../../../lib/semd-email-fallback';

const handler = nextConnect()
// handler.use(middleware)

handler.post(async (req, res) => {
    await dbConnect()
    try {
        // convert long/lat to address
        const address = await getAddress(req.body.latitude, req.body.longitude)

        // transform body to fit schema
        let body = {
            ...req.body,
            address,
            location: [
                req.body.latitude, 
                req.body.longitude
            ],
            monday: [
                req.body.mondayStart, 
                req.body.mondayEnd, 
                req.body.mondayOpen
            ],
            tuesday: [
                req.body.tuesdayStart, 
                req.body.tuesdayEnd, 
                req.body.tuesdayOpen
            ],            
            wednesday: [
                req.body.wednesdayStart, 
                req.body.wednesdayEnd, 
                req.body.wednesdayOpen
            ],            
            monday: [
                req.body.mondayStart, 
                req.body.mondayEnd, 
                req.body.mondayOpen
            ],
            friday: [
                req.body.fridayStart, 
                req.body.fridayEnd, 
                req.body.fridayOpen
            ],
            saturday: [
                req.body.saturdayStart, 
                req.body.saturdayEnd, 
                req.body.saturdayOpen
            ],
            sunday: [
                req.body.sundayStart, 
                req.body.sundayEnd, 
                req.body.sundayOpen
            ],
        }
        
        // if files have been sent via form, upload them
        // and save link in body object
        if (req.files) {
            if (req.files.idProof) {
                body.idProof = await uploadFile(
                    req.files.idProof,
                    `${body.storeName}/${req.files.idProof.name}`,
                    'carrybags-store-data-collection-uploads')
            }
            if (req.files.storePhoto) {
                body.storePhoto = await uploadFile(
                    req.files.storePhoto,
                    `${body.storeName}/${req.files.storePhoto.name}`,
                    'carrybags-store-data-collection-photos')
            }
        }

        const data = await DataModel.create(body)

        // send email
        try {
            await generateFormSubmittedEmail(body.spokespersonEmail, body.storeName)
        } catch (err) {
            console.log(err)
            console.log('ERROR SENDING EMAIL NORMALLY, FALLBACK')
            await fallbackFormSubmittedEmail(body.spokespersonEmail, body.storeName)
        }

        return res.status(201).send(data)
    } catch (error) {
        console.log(error)
        console.log(error.nessage)
        return res.status(400).json(error)
    }
})

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '500mb',
        },
        //bodyParser: false,
    },
}

export default handler