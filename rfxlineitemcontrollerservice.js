<!------------------------------  controller----------------------------->

module.exports.uploadExcel = async (req, res) => {
    try {
        let response = await quotesObj.uploadExcel(req);
        res.status(200).send({ success: true, error: false, data: response });
    } catch (e) {
        res.status(400).send({ success: false, error: true, message: `${e}` });
    }
}



<!------------------------------  service ----------------------------->


module.exports.uploadExcel = async (req, enumData) => {
    let obj = {};
    let arrData = [];
    await req.files.sampleFile.mv('./sampleFile.xlsx');
    await wb.xlsx.readFile('sampleFile.xlsx');
    let arrCol = [];
    let sh = wb.getWorksheet('My Sheet');
    let countval = sh.rowCount;

    sh.columns = [
        { key: 'rfqNo' },
        { key: 'offerReferenceNo' },
        { key: 'currency' },
        { key: 'offervalidity' },
        { key: 'deliveryPeriod' },
        { key: 'paymentterms' },
        { key: 'incoterm1' },
        { key: 'incoterm2' },
        { key: 'hsncode' },
        { key: 'gscode' },
        { key: 'certificationcharge' },
        { key: 'inspectioncharges' },
        { key: 'mischarges' },
        { key: 'cgst' },
        { key: 'sgst' },
        { key: 'igst' },
        { key: 'companyName' }
    ]
    let rfqNo = sh.getCell('B1').value
    rfqNo = rfqNo.replace(/^\D+/g, '');
    let biddate = sh.getCell('D2').value
    let commercialbidateval = sh.getCell('G2').value
    let cell1 = sh.getCell('D4').value
    let cell2 = sh.getCell('D5').value
    let cell3 = sh.getCell('D6').value
    let cell4 = sh.getCell('D7').value
    let cell5 = sh.getCell('D8').value

    let cell6 = sh.getCell('G4').value
    let cell7 = sh.getCell('G5').value
    let cell8 = sh.getCell('G6').value
    let cell9 = sh.getCell('G7').value
    let cell10 = sh.getCell('G8').value

    let cell11 = sh.getCell('J4').value
    let cell12 = sh.getCell('J5').value
    let cell13 = sh.getCell('J6').value
    let cell14 = sh.getCell('J7').value
    let cell15 = sh.getCell('J8').value



    // console.log(sh.rowCount, 'rowcount')
    // console.log(sh.actualColumnCount, 'columncount')
    let count = 0;
    for (let i = 1; i <= sh.rowCount; i++) {
        let billToShipTo = sh.getRow(i).getCell(1).value;
        if (billToShipTo == 'Bill To Ship To level Information') {
            count++;
        }
    }






    let rowresult = 11;
    let countresult = count / 3;
    for (let j = 1; j <= countresult; j++) {
         companyName = sh.getCell('B' + rowresult).value
        let rilSiteName = sh.getCell('D' + rowresult).value
        let packagingcharges = sh.getCell('G' + (rowresult + 1)).value
        let freightcharges = sh.getCell('G' + (rowresult + 2)).value
        let currencychk1 = sh.getCell('I' + (rowresult + 1)).value
        let incoterm3 = sh.getCell('I' + (rowresult + 2)).value 

      
        rowresult = rowresult + 10;
      
    }




    
    let snodetail;
    let counttest = 0;
    for (let uv = 16; uv <= sh.rowCount; uv++) {
        snodetail = sh.getRow(uv).getCell(2).value
        if (snodetail != null) {
            counttest++;
            let contestdata = sh.getRow(uv).values;
            console.log(snodetail, 'snodetails')     
            console.log(contestdata)
        }
        else {
            break;
        }
       
    }

    console.log(counttest, 'counttest')



    arrData = [{
        rfqNo: rfqNo,
        technicalBidDueDate: biddate,
        commercialBidDueDate: commercialbidateval,
        offerReferenceNo: cell1,
        currency: cell2,
        offerValidityPeriod: cell3,
        deliveryPeriod: cell4,
        paymentterms: cell5,
        incoterm1: cell6,
        incoterm2: cell7,
        vendorHsn: cell8,
        gscode: cell9,
        certificationcharge: cell10,
        inspectioncharges: cell11,
        mischarges: cell12,
        cgst: cell13,
        sgst: cell14,
        igst: cell15,
        companyName:companyName
    }];

    return arrData;

}














<-------------------repo ------------------------------>



const RfxLineItemQuotes = require('../models/LineItemQuotes')
const RfxCollaborator = require('../models/RfxCollaborator')

module.exports.addQuotes = async (data) => {
    return await RfxLineItemQuotes.create(data)
}
module.exports.getQuotes = async (params) => {
    return await RfxLineItemQuotes.find(params).lean()
}
module.exports.updateQuotes = async (condition, data) => {
    return await RfxLineItemQuotes.update(condition, data)
}
module.exports.updateQuoteStatus = async (condition,quoteStatus) => {
    return await RfxLineItemQuotes.update(condition, { $set: { 'quoteStatus': quoteStatus}});
}
module.exports.approvedByCollaborator = async (condition,data) => {
    return await RfxLineItemQuotes.update(condition, { $set: { approveCollaborators: data }});
}
module.exports.getCollaborator = async (params) => {
    return await RfxCollaborator.find(params).lean()
}


