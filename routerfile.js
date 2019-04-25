const express = require('express')
const router = new express.Router()
const constants = require('../constants/constants')
const Auth = require('../controllers/Auth')
const rfxHeaderQuotes = require('../controllers/RfxHeaderQuotesController')
const rfxLineItemQuotes = require('../controllers/RfxLineItemQuotesController')

// check default route
router.get('/', (req, res) => {
    res.json({
        message: constants.WELCOME_MSG,
    })
})
//router.use(Auth.VerifyToken)
router.use(Auth.cacheBuster)
//  protected endpoints
//  contract routes

// exports all routes
/**
 * @swagger
 * securityDefinitions:
 *   Value:
 *     type: apiKey
 *     in: header
 *     name: x-access-token
 */

/**
 * @swagger
 * definitions:
 *   RfxHeaderQuotes:
 *     properties:
 *      rfqNo:
 *          type: number
 *      vendorNo:
 *          type: number
 *      gcpTerm:
 *          type: boolean
 *      scpTerm:
 *          type: boolean
 *      contractRedlining:
 *          type: string
 *      rfqValidityFromDate:
 *          type: string
 *          format: date
 *      rfqValiditytoDate:
 *          type: string
 *          format: date
 *      rfqtype:
 *          type: string
 *      rfqReleaseDate:
 *          type: string
 *          format: date
 *      curchasingGroup:
 *          type: string
 *      state:
 *          type: string
 *      country:
 *          type: string
 *      stdCode:
 *          type: number
 *      buyerContactNo:
 *          type: string
 *      buyerMail:
 *          type: string
 *      buyerName:
 *          type: string
 *      buyerMobile:
 *          type: number
 *      buyerEmployeeCode:
 *          type: string
 *      paymentTerm:
 *          type: string
 *      currency:
 *          type: string
 *      incoterm:
 *          type: string
 *      remarks1:
 *          type: string
 *      remarks2:
 *          type: string
 *      rfqStatus:
 *          type: string
 *      rfqDownloadDate:
 *          type: string
 *          format: date
 *      markForDeletion:
 *          type: string
 *      sapServer:
 *          type: string
 *      sapServerDescription:
 *          type: string
 *      rfqDescription:
 *          type: string
 *      rfqShortDescription:
 *          type: string
 *      rfqLongtDescription:
 *          type: string
 *      rilGstNo:
 *          type: string
 *      commercialBidDueDate:
 *          type: string
 *          format: date
 *      technicalBidDueDate:
 *          type: string
 *          format: date
 *      createdBy:
 *          type: string
 *      upDatedBy:
 *          type: string
 *      creationDate:
 *          type: string
 *          format: date
 *      updationDate:
 *          type: string
 *          format: date
 *      attachmentList:
 *         type: array
 *         items:
 *           properties:
 *             docId:
 *               type: number
 *             docTypeVal:
 *               type: string
 *             docDesc:
 *               type: string
 *             fileName:
 *               type: string
 *             isInternal:
 *               type: boolean
 *             isExternal:
 *               type: boolean
 *             docFileId:
 *               type: string  
 */


/**
 * @swagger
 * /rfxHeaderQuotes/addQuotes:
 *   post:
 *     tags:
 *       - RfxHeaderQuotes
 *     description: Creates a new quoters
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: rfxQuotesObject
 *         description: Quotes object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/RfxHeaderQuotes'
 *     responses:
 *       200:
 *         description: Successfully created
 */

router.post('/rfxHeaderQuotes/addQuotes',rfxHeaderQuotes.addQuotes)

/**
 * @swagger
 * /rfxHeaderQuotes/getQuotes/{rfqNo}/{vendorNo}:
 *   get:
 *     tags:
 *       - RfxHeaderQuotes 
 *     description: Returns quotes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: rfqNo
 *         description: RFQ Id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: vendorNo
 *         description: vendorNo
 *         in: path
 *         required: true
 *         type: integer          
 *     responses:
 *       200:
 *         description: Quotes details
 *         
 */
router.get('/rfxHeaderQuotes/getQuotes/:rfqNo/:vendorNo', rfxHeaderQuotes.getQuotes)

/**
 * @swagger
 * /rfxHeaderQuotes/updateQuotes:
 *   put:
 *     tags:
 *       - RfxHeaderQuotes
 *     description: Update quoters
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: rfxQuotesObject
 *         description: Quotes object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/RfxHeaderQuotes'
 *     responses:
 *       200:
 *         description: Successfully created
 */

router.put('/rfxHeaderQuotes/updateQuotes',rfxHeaderQuotes.updateQuotes)


/**
 * @swagger
 * /rfxHeaderQuotes/getRfxQuoteDetails:
 *   get:
 *     tags:
 *       - RfxHeaderQuotes
 *     description: Fetch all the Quote details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: rfqNo
 *         description: RFQ Number
 *         in: query
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Quote details fetched successfully
 */

router.get('/rfxHeaderQuotes/getRfxQuoteDetails', rfxHeaderQuotes.getRfxQuoteDetails)


/**
 * @swagger
 * /rfxHeaderQuotes/getCountsRfq/{vendorNo}:
 *   get:
 *     tags:
 *       - RfxHeaderQuotes 
 *     description: Returns Counts
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: vendorNo
 *         description: vendorNo
 *         in: path
 *         required: true
 *         type: integer          
 *     responses:
 *       200:
 *         description: Count Quotes details
 *         
 */
router.get('/rfxHeaderQuotes/getCountsRfq/:vendorNo',  rfxHeaderQuotes.getCountsRfq)


/**
 * @swagger
 * definitions:
 *   RfxLineItemQuotes:
 *     properties:
 *      rfqNo:
 *          type: number
 *      rfqLineItemNo:
 *          type: number
 *      vendorNo:
 *          type: number
 *      vendorDeliveryDate:
 *          type: string
 *          format: date
 *      offerValidityPeriod:
 *          type: string
 *          format: date
 *      vendorQuantity:
 *          type: number
 *      materialCode:
 *          type: String
 *      materialDescription:
 *          type: string
 *      quoteDate:
 *          type: string
 *          format: date
 *      targetQuantity:
 *          type: number
 *      unitOfMeasure:
 *          type: string
 *      rate:
 *          type: number
 *      pricePerUnit:
 *          type: number
 *      monthlyCost:
 *          type: number
 *      depreciationMonth:
 *          type: number
 *      prNo:
 *          type: string
 *      PrLineItemNo:
 *          type: string
 *      longDescription:
 *          type: string
 *      companyCode:
 *          type: string
 *      companyName:
 *          type: string
 *      companyAdd1:
 *          type: string
 *      companyAdd2:
 *          type: string
 *      companyAdd3:
 *          type: string
 *      companyPinCode:
 *          type: number
 *      companyContactNo:
 *          type: string
 *      rilSite:
 *          type: number
 *      rilSiteName:
 *          type: string
 *      mrpController:
 *          type: string
 *      requisitionerName:
 *          type: string
 *      plant:
 *          type: string
 *      deliveryDate:
 *          type: string
 *          format: date
 *      packageNo:
 *          type: string
 *      deletionFlag:
 *          type: string
 *      quoteStatus:
 *          type: string
 *      sapServer:
 *          type: string
 *      requisionerEmpCode:
 *          type: string
 *      sapServerDesc:
 *          type: string
 *      rilHsn:
 *          type: string
 *      vendorHsn:
 *          type: string
 *      lineItemFrom: 
 *          type: string
 *      charmatstatus:
 *          type: string
 *      charspec:
 *          type: string
 *      nummesccodeid:
 *          type: string
 *      nvchabbrevdesc:
 *          type: string
 *      nvchmattypedesc:
 *          type: string
 *      pvKey:
 *          type: string
 *      rwksUOMCode:
 *          type: string
 *      sapcode:
 *          type: string
 *      uomCode:
 *          type: string
 *      uomDesc:
 *          type: string
 *      uomUnitType:
 *          type: string
 *      assignCollaborators:
 *          type: array
 *          items:
 *           properties:
 *            collaboratorNo:
 *              type: string
 *            collaboratorName:
 *              type: string
 *      approveCollaborators:
 *          type: array
 *          items:
 *           properties:
 *            collaboratorNo:
 *             type: string
 *            collaboratorName:
 *             type: string
 *            recomendationDate:
 *             type: string
 *            recommendation:
 *             type: string
 *            quoteStatus:
 *             type: string
 *      createdBy:
 *          type: string
 *      updatedBy:
 *          type: string
 *      creationDate:
 *          type: string
 *          format: date
 *      updationDate:
 *          type: string
 *          format: date
 *      siteList:
 *          type: array
 *          items:
 *           properties:
 *            sitedesc:
 *             type: string  
 *      companyReferences:
 *          type: array
 *          items:
 *           properties:
 *            companyName:
 *             type: string
 *            referenceNo:
 *             type: string
 *            referenceType:
 *             type: string
 *      characteristics:
 *          type: array
 *          items:
 *           properties:
 *             charbinlabelind:
 *               type: string
 *             charoptionalind:
 *               type: string
 *             charvaluetype:
 *               type: string
 *             numcharid:
 *               type: string
 *             numformatcharid:
 *               type: boolean
 *             nvchcharabbrev:
 *               type: boolean
 *             nvchcharacteristics:
 *               type: string  
 *             nvchcharvalues:
 *               type: string  
 *             nvchuomcode:
 *               type: string  
 *      uploadAttachmentList:
 *         type: array
 *         items:
 *           properties:
 *             docId:
 *               type: number
 *             docTypeVal:
 *               type: string
 *             docDesc:
 *               type: string
 *             fileName:
 *               type: string
 *             isInternal:
 *               type: boolean
 *             isExternal:
 *               type: boolean
 *             docFileId:
 *               type: string  
 *      downloadAttachmentList:
 *         type: array
 *         items:
 *           properties:
 *             docId:
 *               type: number
 *             docTypeVal:
 *               type: string
 *             docDesc:
 *               type: string
 *             fileName:
 *               type: string
 *             isInternal:
 *               type: boolean
 *             isExternal:
 *               type: boolean
 *             docFileId:
 *               type: string  
 */


/**
 * @swagger
 * /rfxLineItemQuotes/addQuotes:
 *   post:
 *     tags:
 *       - RfxLineItemsQuotes
 *     description: Creates a new quoters
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: rfxQuotesObject
 *         description: Quotes object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/RfxLineItemQuotes'
 *     responses:
 *       200:
 *         description: Successfully created
 */

router.post('/rfxLineItemQuotes/addQuotes',rfxLineItemQuotes.addQuotes)


/**
 * @swagger
 * /rfxLineItemQuotes/getQuotes/{rfqNo}/{vendorNo}:
 *   get:
 *     tags:
 *       - RfxLineItemsQuotes 
 *     description: Returns quotes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: rfqNo
 *         description: RFQ Id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: vendorNo
 *         description: vendorNo
 *         in: path
 *         required: true
 *         type: integer          
 *     responses:
 *       200:
 *         description: Quotes details
 *         
 */
router.get('/rfxLineItemQuotes/getQuotes/:rfqNo/:vendorNo', rfxLineItemQuotes.getQuotes)


/**
 * @swagger
 * /rfxLineItemQuotes/updateQuotes:
 *   put:
 *     tags:
 *       - RfxLineItemsQuotes
 *     description: Update quoters
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: rfxQuotesObject
 *         description: Quotes object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/RfxLineItemQuotes'
 *     responses:
 *       200:
 *         description: Successfully created
 */

router.put('/rfxLineItemQuotes/updateQuotes',rfxLineItemQuotes.updateQuotes)

/**
 * @swagger
 * /rfxLineItemQuotes/updateQuoteStatus:
 *   put:
 *     tags:
 *       - RfxLineItemsQuotes
 *     description: Update Quote Status
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: rfxQuotesObject
 *         description: Quotes object
 *         in: body
 *         required: true
 *     responses:
 *       200:
 *         description: Quote details fetched successfully
 */

router.put('/rfxLineItemQuotes/updateQuoteStatus', rfxLineItemQuotes.updateQuoteStatus)


/**
 * @swagger
 * /rfxLineItemQuotes/uploadExcel:
 *  post:
 *     tags:
 *       - RfxLineItemsQuotes
 *     description: Upload BasicInfo excel file
 *  produces:
 *       - multipart/form-data
 *  consumes:
 *        - multipart/form-data
 *  parameters:
 *        - in: formData
 *          name: sampleFile
 *          type: file
 *          description: The file to upload.
 *  responses:
 *       200:
 *         description: Successfully created
 */
router.post('/rfxLineItemQuotes/uploadExcel', rfxLineItemQuotes.uploadExcel);


module.exports = router

