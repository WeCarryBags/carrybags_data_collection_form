const nodemailer = require('nodemailer')
const EMAIL_ADDRESS = 'support@wecarrybags.co.uk'
const EMAIL_PASSWORD = 'Carrybags45@'

const sendMailFallback = async (recipient, mailSubject, message) => {
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: EMAIL_ADDRESS,
            to: recipient,
            subject: mailSubject,
            html: message
        }
        const mailer = nodemailer.createTransport({
            host: 'smtp.zoho.eu',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: EMAIL_ADDRESS,
                pass: EMAIL_PASSWORD
            }
        })
        mailer.sendMail(mailOptions, (err) => {
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

const fallbackFormSubmittedEmail = async (recipient, storeName) => {
    const message = `
    ${EMAIL_HEADER}
    
    <div style="margin-top: 2em; padding-left: 2em; padding-right: 2em;">
      <p style="font-size: 24px; font-weight: 500; text-align: center; color: #363430;">
         Hi ${storeName},
      </p>
      <p style="font-size: 24px; text-align: center; color: #363430; margin-bottom: 2em;">
         Thank you for registering with CarryBags!
      </p>
      <p style="font-size: 16px; font-weight: 400; line-height: 24px; margin-bottom: 0.5em;">
         We are currently reiewing your registration details.
      </p>
      <p style="font-size: 16px; font-weight: 400; line-height: 24px; margin-bottom: 0.5em;">
         Please sit back and relax. We will get back to you soon.
      </p>
      <p style="font-size: 16px; font-weight: 400; line-height: 24px; margin-bottom: 0.5em;">
         If you have any queries in the meantime, please do not hesitate to contact us at <a
            style="color: #4299E1; text-decoration: none;"
            href="mailto:support@wecarrybags.co.uk">support@wecarrybags.co.uk</a>.</p>
      <p style="font-size: 16px; font-weight: 400; line-height: 24px; margin-top: 1em;">
         Best Regards,
      </p>
      <p style="font-size: 20px; font-weight: 500; line-height: 24px;">
         Team CarryBags
      </p>
   </div>
    
    ${EMAIL_FOOTER}
    `

    await sendMailFallback(recipient, 'Thank you for registering with CarryBags!', message)
}

const fallbackApprovalEmail = async (recipient, storeName) => {
    const message = `
    ${EMAIL_HEADER}
    
    <div style="margin-top: 2em; padding-left: 2em; padding-right: 2em;">
    <p style="font-size: 24px; font-weight: 500; text-align: center; color: #363430;">Hi ${storeName},</p>
    <p style="font-size: 24px; text-align: center; color: #363430; margin-bottom: 2em;">Your CarryBags account has been approved!</p>
    
    <p style="font-size: 16px; font-weight: 400; line-height: 24px; margin-bottom: 0.5em;">We will send you an email for the next step ahead of launch.</p>
    <p style="font-size: 16px; font-weight: 400; line-height: 24px; margin-bottom: 0.5em;">If you have any queries in the meantime, please do not hesitate to contact us at <a style="color: #4299E1; text-decoration: none;" href="mailto:support@wecarrybags.co.uk">support@wecarrybags.co.uk</a>.</p>
    
    <p style="font-size: 16px; font-weight: 400; line-height: 24px; margin-top: 1em;">Best Regards,</p>
    <p style="font-size: 20px; font-weight: 500; line-height: 24px;">Team CarryBags</p>
    
    ${EMAIL_FOOTER}
    `

    await sendMailFallback(recipient, 'Your application with CarryBags has been approved!', message)
}

module.exports = { fallbackFormSubmittedEmail, fallbackApprovalEmail }
