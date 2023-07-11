const Base = require("./base");

require("dotenv").config();
const username = process.env.BKASH_USERNAME;
const password = process.env.BKASH_PASSWORD;
const appKey = process.env.BKASH_APP_KEY;
const appSecret = process.env.BKASH_APP_SECRET;

(async () => {
  bkash = await new Base(username, password, appKey, appSecret, true).init();
  
  const genReftres= await bkash.refreshToken();
  console.log('Generate refresh Token',genReftres);

  const res = await bkash.agreement.createAgreement({
    payerReference: "01770618575",
    callbackURL: "http://shazzad.online",
  });
  console.log(res.bkashURL);

  setTimeout(async () => {
    const { agreementID } = await bkash.agreement.executeAgreement({
      paymentID: res.paymentID,
    });

    const res3 = await bkash.agreement.queryAgreement({ agreementID });
    console.log("res3:", res3);

    // const res4= await bkash.agreement.cancelAgreement({agreementID});
    // console.log(res4);
    const res5 = await bkash.payment.createPayment({
      agreementID,
      payerReference: "01770618575",
      callbackURL: "http://shazzad.online",
      amount: "1",
      currency: "BDT",
      intent: "sale",
      merchantInvoiceNumber: "SH123456789",
    });
    console.log(res5);

    setTimeout(async () => {
      const res6 = await bkash.payment.executePayment({
        paymentID: res5.paymentID,
      });
      console.log("res6:", res6);

      const res7 = await bkash.payment.queryPayment({
        paymentID: res6.paymentID,
      });
      console.log("res7:", res7);

      const res8 = await bkash.transaction.searchTransaction({
        trxID: res7.trxID
      });
      console.log("res8:", res8);

      const res9 = await bkash.transaction.refundTransaction({
        paymentID: res6.paymentID,
        amount: res8.amount,
        trxID: res8.trxID,
        sku: "SmartPhone",
        reason: "Wrong Product",
      });
      console.log("res9:", res9);

      const refRes = await bkash.transaction.refundStatus({
        paymentID: res6.paymentID,
        trxID: res6.trxID,
      });
      console.log(refRes);
    }, 30000);


  }, 30000);
})();
