import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const dataCollectionSchema = Schema({
    storeName: { type: String },
    storeEmail: { type: String },
    spokespersonEmail: { type: String },
    contactNumber: {type: String },
    authorisedPersonName: { type: String },
    carryBagsRepresentative: { type: String },
    termsAccepted: { type: Schema.Types.Boolean, default: false },
    verificationStatus: { type: String, default: 'pending' },
    date: { type: Date, default: Date.now() },
    location: { type: [Schema.Types.Mixed] },
    address: { type: String },

    // opening times
    monday: {type: [String]},
    tuesday: {type: [String]},
    wednesday: {type: [String]},
    thursday: {type: [String]},
    friday: {type: [String]},
    saturday: {type: [String]},
    sunday: {type: [String]},

    // file url strings
    idProof: {type: String},
    storePhoto: {type: String},
})

dataCollectionSchema.pre('save', async function(next) {
	// set verification status to lowercase
	this.verificationStatus = this.verificationStatus.toLowerCase()
	next()
})

export const DataModel = mongoose.models.DataCollection || mongoose.model('DataCollection', dataCollectionSchema)
