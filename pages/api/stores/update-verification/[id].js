import { gql } from '@apollo/client/core'
import { apollo_client } from '../../../../lib/apollo_client'
import {default as axios} from "axios";

const completeFormLink = 'https://carrybags-complete-partner-registration.vercel.app/'

export default async function handler(req, res) {
    switch (req.method) {
        case 'PUT':
            const { id } = req.query
            const { verificationStatus } = req.body

            try {
                const mutation = gql`
                mutation {
                    updateStore(
                        id: "${id}"
                        verificationStatus: "${verificationStatus}"
                    ) {
                        _id
                        storeName
                        spokespersonEmail
                    }
                }
                `
                const store = (await apollo_client.mutate({mutation})).data.updateStore

                if (verificationStatus === 'accepted') {
                    console.log("accepted")
                    await axios.post('https://carrybags-shared-data-logic.herokuapp.com/api/email/formal', {
                            email: store.spokespersonEmail,
                            parameters: {
                                greetingHeading: `Hi ${store.storeName},`,
                                greetingSubHeading: 'Your application with CarryBags has been approved!',
                                paragraphs: [
                                    `You may complete the final part of your registration by going to ${completeFormLink}/?storeid=${store._id}.`,
                                    'We look forward to hearing from you soon!'
                                    /* 'We will email you for the next step ahead of launch.', */
                                ]
                            }
                        }
                    )
                }

                return res.status(200).json(store)
            } catch (error) {
                console.log(error)
                console.log(error.nessage)
                return res.status(400).json(error)
            }
        default:
            return res.status(404).json({ 'message': `This route only accepts PUT but it received ${req.method}` })
    }
}
