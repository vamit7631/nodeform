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


let Excel = require('exceljs');
let wb = new Excel.Workbook();
let fs = require('fs')


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
        { key: 'companyName' },
        { key: 'rilSiteName' },
        { key: 'rfxlineitem' },
        { key: 'rfxlineitemDesc' },
        { key: 'vomcode' },
        { key: 'rilDileveryDate' }
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
    let snodetail;
    let resultset = [];
    let objData = [];
    let counttest = 0;
    let snoval;
    let uv;
    let arrDataList = [];
    for (let j = 1; j <= countresult; j++) {
        companyName = sh.getCell('B' + rowresult).value
        rilSiteName = sh.getCell('D' + rowresult).value
        let packagingcharges = sh.getCell('G' + (rowresult + 1)).value
        let freightcharges = sh.getCell('G' + (rowresult + 2)).value
        let currencychk1 = sh.getCell('I' + (rowresult + 1)).value
        let incoterm3 = sh.getCell('I' + (rowresult + 2)).value
        uv = rowresult + 5;
        console.log(companyName)
        console.log(countresult, 'ddddddddddddddddddddddddddddddddddddd')
        for (uv; uv <= sh.rowCount; uv++) {
            snodetail = sh.getRow(uv).getCell(2).value
            if (snodetail == null) {
                break;
            } else {
                console.log(uv, 'ssssssssssssssssssssssssssssssssssssssssss')
                 snodetail = sh.getRow(uv).values;
                // counttest++;
           //      snoval = snodetail[3];
           //      console.log(snoval,'fffffffffffffff')
            //     resultset.push(uv)
               //   console.log(snoval)
                   objData.push({rfqNo,...snodetail,companyName,rilSiteName})
                   

                
              
                //  if (arrCol.indexOf(snoval) === -1) {
                //      arrCol.push(snoval);
                    
                //  }

            }

        }

      
        rowresult = rowresult + 10;

    }

    console.log(objData)
    // let rfxlineItem;
    // let rfxlineitemDesc;
    // let vomcode;
    // let rilDileveryDate;
    // for(resultDataSet of objData){
    //     rfxlineItem = resultDataSet[3]
    //     rfxlineitemDesc = resultDataSet[4]
    //     vomcode = resultDataSet[5]
    //     rilDileveryDate = resultDataSet[6]
    // }

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
        companyName:companyName,
        rilSiteName: rilSiteName,
        // rfxlineitem :  rfxlineItem,
        // rfxlineitemDesc : rfxlineitemDesc,
        // vomcode : vomcode,
        // rilDileveryDate : rilDileveryDate
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


