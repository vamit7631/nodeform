const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')
const autoIncrement = require('mongoose-auto-increment')

const LineItemQuotesSchema = new mongoose.Schema({
    rfqNo: {
        type: Number,
        required: [true, 'can\'t be blank']
    },
    rfqLineItemNo: {
        type: Number,
    },
    vendorNo: {
        type: String,
    },
    vendorDeliveryDate: {
        type: Date,
    },
    offerValidityPeriod: {
        type: Date,
    },
    vendorQuantity: {
        type: Number,
    },
    materialCode: {
        type: String,
    },
    materialDescription: {
        type: String,
    },
    quoteDate: {
        type: Date,
    },
    targetQuantity: {
        type: Number,
    },
    unitOfMeasure: {
        type: String,
    },
    rate: {
        type: Number,
    },
    pricePerUnit: {
        type: Number,
    },
    monthlyCost: {
        type: Number,
    },
    depreciationMonth: {
        type: Number,
    },
    prNo: {
        type: String,
    },
    PrLineItemNo: {
        type: String,
    },
    longDescription: {
        type: String,
    },
    companyCode: {
        type: String,
    },
    companyName: {
        type: String,
    },
    companyAdd1: {
        type: String,
    },
    companyAdd2: {
        type: String,
    },
    companyAdd3: {
        type: String,
    },
    companyPinCode: {
        type: Number,
    },
    companyContactNo: {
        type: String,
    },
    rilSite: {
        type: Number,
    },
    rilSiteName: {
        type: String,
    },
    mrpController: {
        type: String,
    },
    requisitionerName: {
        type: String,
    },
    plant: {
        type: String,
    },
    deliveryDate: {
        type: Date,
    },
    packageNo: {
        type: String,
    },
    deletionFlag: {
        type: String,
    },
    quoteStatus: {
        type: String,
    },
    sapServer: {
        type: String,
    },
    requisionerEmpCode: {
        type: String,
    },
    sapServerDesc: {
        type: String,
    },
    rilHsn: {
        type: String,
    },
    vendorHsn: {
        type: String,
    },
    lineItemFrom: {
        type: String,
    },
    charmatstatus: {
        type: String,
    },
    charspec: {
        type: String,
    },
    nummesccodeid: {
        type: String,
    },
    nvchabbrevdesc: {
        type: String,
    },
    nvchmattypedesc: {
        type: String,
    },
    pvKey: {
        type: String,
    },
    rwksUOMCode: {
        type: String,
    },
    sapcode: {
        type: String,
    },
    uomCode: {
        type: String,
    },
    uomDesc: {
        type: String,
    },
    uomUnitType: {
        type: String,
    },
    assignCollaborators: [{
        collaboratorNo: {
            type: String
        },
        collaboratorName: {
            type: String
        }
    }],
    approveCollaborators: [{
        collaboratorNo: {
            type: String
        },
        collaboratorName: {
            type: String
        },
        recomendationDate: {
            type: Date,
        },
        recommendation: {
            type: String,
        },
        quoteStatus: {
            type: String,
        }
    }],
    siteList: [{
        sitedesc: {
            type: String
        }
    }],
    companyReferences: [{
        companyName: {
            type: String
        },
        referenceNo: {
            type: String
        },
        referenceType: {
            type: String
        }
    }],
    characteristics: [{
        charbinlabelind: {
            type: String
        },
        charoptionalind: {
            type: String
        },
        charvaluetype: {
            type: String
        },
        numcharid: {
            type: String
        },
        numformatcharid: {
            type: String
        },
        nvchcharabbrev: {
            type: String
        },
        nvchcharacteristics: {
            type: String
        },
        nvchcharvalues: {
            type: String
        },
        nvchuomcode: {
            type: String
        },
    }],
    uploadAttachmentList: [{
        docId: {
            type: Number
        },
        docTypeVal: {
            type: Number
        },
        docDesc: {
            type: String
        },
        fileName: {
            type: String
        },
        isInternal: {
            type: Boolean
        },
        isExternal: {
            type: Boolean
        },
        docFileId: {
            type: String
        }
    }],
    downloadAttachmentList: [{
        docId: {
            type: Number
        },
        docTypeVal: {
            type: Number
        },
        docDesc: {
            type: String
        },
        fileName: {
            type: String
        },
        isInternal: {
            type: Boolean
        },
        isExternal: {
            type: Boolean
        },
        docFileId: {
            type: String
        }
    }],
    createdBy: {
        type: String,
    },
    updatedBy: {
        type: String,
    },
    creationDate: {
        type: Date,
    },
    updationDate: {
        type: Date,
    }
},
    {
        timestamps: true,
    })

autoIncrement.initialize(mongoose.connection)

LineItemQuotesSchema.plugin(uniqueValidator, {
    message: 'already exists.',
})
LineItemQuotesSchema.plugin(autoIncrement.plugin, {
    model: 'rfxlineitemquotes',
    field: '_id',
    startAt: 1
})
const LineItemQuotes = mongoose.model('rfxlineitemquotes', LineItemQuotesSchema);
module.exports = LineItemQuotes
