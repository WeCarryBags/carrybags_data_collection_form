import { gql } from '@apollo/client/core'
import { apollo_client } from '../../../../lib/apollo_client'
import { DataModel } from '../../../../lib/data-model'
import dbConnect from '../../../../lib/db-connect'

export default async function handler(req, res) {
    await dbConnect()
    switch (req.method) {
        case 'GET':
            const id = req.query.id
            try {
                const query = gql`
                query {
                    getStoreByID(id: "${id}") {
                        storeName
                        contactNumber
                        registeredAt
                        location {
                            addressLine1
                            province
                            postalCode
                        }
                        authorisedPersonName
                        spokespersonEmail
                        carryBagsRepresentative
                        storePhoto
                        idProof
                        termsAccepted
                        verificationStatus
                        monday
                        tuesday
                        wednesday
                        thursday
                        friday
                        saturday
                        sunday
                    }
                }
                `
                let data = (await apollo_client.query({ query })).data.getStoreByID
                
                const {
                    monday, 
                    tuesday, 
                    wednesday, 
                    thursday,
                    friday,
                    saturday,
                    sunday
                } = data

                data.days = [
                    ['Monday', ...monday],
                    ['Tuesday', ...tuesday],
                    ['Wednesday', ...wednesday], 
                    ['Thursday', ...thursday],
                    ['Friday', ...friday],
                    ['Saturday', ...saturday],
                    ['Sunday', ...sunday]
                ]

                const address = [
                    data.location.addressLine1,
                    data.location.province,
                    data.location.postalCode
                ].filter((el) => el || el !== '').join(', ')

                data.address = address

                data.date = data.registeredAt

                return res.status(200).json(data)
            } catch (error) {
                console.log(error)
                console.log(error.nessage)
                return res.status(400).json(error)
            }
        default:
            return res.status(404).json({ 'message': `This route only accepts GET but it received ${req.method}` })
    }
}
