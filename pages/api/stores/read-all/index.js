import { gql } from '@apollo/client/core'
import { apollo_client } from '../../../../lib/apollo_client'
import { DataModel } from '../../../../lib/data-model'
import dbConnect from '../../../../lib/db-connect'

export default async function handler(req, res) {
    await dbConnect()
    switch (req.method) {
        case 'GET':
            try {
                const query = gql`
                query {
                    getAllStores {
                        _id
                        storeName
                        termsAccepted
                        idProof
                    }
                }
                `
                const data = (await apollo_client.query({ query })).data.getAllStores
                
                return res.status(200).send(data)
            } catch (error) {
                console.log(error)
                console.log(error.nessage)
                return res.status(400).json(error)
            }
        default:
            return res.status(404).json({ 'message': `This route only accepts GET but it received ${req.method}` })
    }
}
