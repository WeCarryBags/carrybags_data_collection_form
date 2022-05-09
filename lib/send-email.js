const { default: axios } = require('axios');
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars');
const EMAIL_ADDRESS = 'support@wecarrybags.co.uk'
const EMAIL_PASSWORD = 'Carrybags45@'

const sendMail = async (recipient, mailSubject, context) => {

    const templatePath = require('path').resolve(__dirname, '../../../../../lib/email_templates')
    
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            host: 'smtp.zoho.eu',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: EMAIL_ADDRESS,
                pass: EMAIL_PASSWORD
            }
        })
        transporter.use('compile', hbs({
            viewEngine: {
                extname: '.handlebars',
                layoutsDir: templatePath,
                defaultLayout: 'email',
            },
            viewPath: templatePath,
        }))
        const mailOptions = {
            from: EMAIL_ADDRESS,
            to: recipient,
            subject: mailSubject,
            template: 'email',
            context: context
        }
        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.error(err)
                resolve(false)
            } else {
                console.log('email sent')
                resolve(true)
            }
        })
    })
}

const EMAIL_HEADER = `
<!DOCTYPE html>
<html>

<style>
   @import url("https://fonts.googleapis.com/css?family=Rubik:400,500|Inter:400");

   * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Rubik';
   }
</style>

<head>
   <meta charset="UTF-8" />
</head>

<body>

<div style="background-color: #fff6e5; text-align: center;">
    <img src="https://carrybags-detail-collection-nextjs.vercel.app/email-logo.png" style="width: 100px; margin: 1em;" />
    </div>
`

const EMAIL_FOOTER = `
<div style="margin-top: 2em; border-top: 0.5px solid rgba(0, 0, 0, 0.10); background-color: #fafafa; text-align: center;">
    <img src="https://carrybags-detail-collection-nextjs.vercel.app/grey-email-logo.png" style="width: 100px; padding: 1em; padding-bottom: 0.5em; opacity: 0.5;" alt="Carry Bags logo"/>
       <p style="font-weight: 400; font-size: 12px; line-height: 14px; color: #837E7E; padding-bottom: 1em;">© Copyright 2022 Carrybags Limited. All Rights Reserved.</p>
    </div>
</body>

</html>
`

const generateFormSubmittedEmail = async (recipient, storeName) => {
    await axios.post('https://carrybags-shared-data-logic.herokuapp.com/api/email/formal', {
        email: recipient,
        parameters: {
                greetingHeading: `Hi ${storeName},`,
                greetingSubHeading: 'Thank you for registering with CarryBags!',
                paragraphs: [
                    'We are currently reiewing your registration details.',
                    'Please sit back and relax. We will get back to you soon.'
                ]
            }
        }
    )
}

const generateApprovalEmail = async (recipient, storeName) => {
    await axios.post('https://carrybags-shared-data-logic.herokuapp.com/api/email/formal', {
        email: recipient,
        parameters: {
                greetingHeading: `Hi ${storeName},`,
                greetingSubHeading: 'Your application with CarryBags has been approved!',
                paragraphs: [
                    'We will send you an email for the next step ahead of launch.',
                ]
            }
        }
    )
}

module.exports = { generateFormSubmittedEmail, generateApprovalEmail }
