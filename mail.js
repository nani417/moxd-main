const API_KEY = '7c447944a765f0b5a288f91731c65503-c3d1d1eb-e7bcad0a';
const DOMAIN = 'mail.wechimni.org';
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: 'api', key: API_KEY });
/*
const messageData = {
    from: "support@wechimni.org",
    to: 'suresh@moshimoshi.in',
    subject: 'NewsLetter',
    text: email_id,
};*/

// module.exports = function () {

    exports.welcomeEmail = async (cust_name) => {          
        return new Promise((resolve, reject) => {
            const messageData = {
                from: 'support@moxd.org',
                to: cust_name.email,
                subject: 'Welcome',
                text: 'Testing some Mailgun awesomeness!',
                html: `<!DOCTYPE html>
                <html>          
                    <head>
                        <title></title>
                        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                        <style type="text/css">
                            body,
                            table,
                            td,
                            a {
                                -webkit-text-size-adjust: 100%;
                                -ms-text-size-adjust: 100%;
                            }
                    
                            table,
                            td {
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                            }
                    
                            img {
                                -ms-interpolation-mode: bicubic;
                            }
                    
                            img {
                                border: 0;
                                height: auto;
                                line-height: 100%;
                                outline: none;
                                text-decoration: none;
                            }
                    
                            table {
                                border-collapse: collapse !important;
                            }
                    
                            body {
                                height: 100% !important;
                                margin: 0 !important;
                                padding: 0 !important;
                                width: 100% !important;
                            }
                    
                            a[x-apple-data-detectors] {
                                color: inherit !important;
                                text-decoration: none !important;
                                font-size: inherit !important;
                                font-family: inherit !important;
                                font-weight: inherit !important;
                                line-height: inherit !important;
                            }
                    
                            @media screen and (max-width: 480px) {
                                .mobile-hide {
                                    display: none !important;
                                }
                    
                                .mobile-center {
                                    text-align: center !important;
                                }
                            }
                    
                            div[style*="margin: 16px 0;"] {
                                margin: 0 !important;
                            }
                        </style>
                    
                    <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
                        <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Open Sans, Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
                            For what reason would it be advisable for me to think about business content? That might be little bit risky to have crew member like them.
                        </div>
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                        <tr>
                                            <td align="center" valign="top" style="font-size:0; padding: 35px;" bgcolor="#F44336">
                                                <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                                        <tr>
                                                            <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;" class="mobile-center">
                                                                <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #ffffff;">Welcome ${cust_name.firstname}</h1>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                                <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;" class="mobile-hide">

                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                                <tr>
                                                <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                                    <tr><td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;"> <img src="https://freesvg.org/img/abstract-user-flat-4.png" width="125" height="120" style="display: block; border: 0px;" />
                                                    <h3>Name: ${cust_name.firstname} ${cust_name.lastname}</h3>
                                                    <h3>Contact: ${cust_name.mobile_number}</h3>
                                                    <h3>Email: ${cust_name.email}</h3>                                                
                                                    </tr>
                                                        <tr>
                                                            <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;"> <img src="https://img.icons8.com/carbon-copy/100/000000/checked-checkbox.png" width="125" height="120" style="display: block; border: 0px;" /><br>
                                                                <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #5c5b58; margin: 0;">Thank you for filling out our sign up form. We are glad that you joined us. 
                                                                Have a nice day, </h2>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                        <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;"><br>
                                                            <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;">MOXD</h2>
                                                        </td>
                                                    </tr>                             
                                                    </table>
                                                </td>
                                            </tr>
                                </td>
                            </tr>
                        </table>
                    </body>
                    
                    </html>`
            };

            client.messages.create(DOMAIN, messageData)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    console.log(err);
                    resolve(err);
                });
        })
    };

    this.mailOTP = async (email_id,otp) => {
        return new Promise((resolve, reject) => {
            const messageData = {
                from: 'support@wechimni.org',
                to: email_id,
                subject: 'OTP From Wechimni',
                text: 'Verify OTP',
                html: `<!DOCTYPE html>
                <html>
                
                <head>
                    <title></title>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <style type="text/css">
                        body,
                        table,
                        td,
                        a {
                            -webkit-text-size-adjust: 100%;
                            -ms-text-size-adjust: 100%;
                        }
                
                        table,
                        td {
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                        }
                
                        img {
                            -ms-interpolation-mode: bicubic;
                        }
                
                        img {
                            border: 0;
                            height: auto;
                            line-height: 100%;
                            outline: none;
                            text-decoration: none;
                        }
                
                        table {
                            border-collapse: collapse !important;
                        }
                
                        body {
                            height: 100% !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            width: 100% !important;
                        }
                
                        a[x-apple-data-detectors] {
                            color: inherit !important;
                            text-decoration: none !important;
                            font-size: inherit !important;
                            font-family: inherit !important;
                            font-weight: inherit !important;
                            line-height: inherit !important;
                        }
                
                        @media screen and (max-width: 480px) {
                            .mobile-hide {
                                display: none !important;
                            }
                
                            .mobile-center {
                                text-align: center !important;
                            }
                        }
                
                        div[style*="margin: 16px 0;"] {
                            margin: 0 !important;
                        }
                    </style>
                
                <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
                    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Open Sans, Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
                        For what reason would it be advisable for me to think about business content? That might be little bit risky to have crew member like them.
                    </div>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                    <tr>
                                        <td align="center" valign="top" style="font-size:0; padding: 35px;" bgcolor="#F44336">
                                            <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                                    <tr>
                                                        <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;" class="mobile-center">
                                                            <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #ffffff;">Welcome to Wechimni</h1>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                            <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;" class="mobile-hide">
            
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                                <tr>
                                                    <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;"> <img src="https://img.icons8.com/carbon-copy/100/000000/checked-checkbox.png" width="125" height="120" style="display: block; border: 0px;" /><br>
                                                        <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;">Please dont share the OTP to anyone. 
                                                        </h2>
                                                    </td>
                                                </tr>
                                                <tr>
                                                <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;"><br>
                                                    <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;"> OTP ${otp}</h2>
                                                </td>
                                            </tr>
                                        
            
                                               
                                            </table>
                                        </td>
                                    </tr>
                                  
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                
                </html>`
            };

            client.messages.create(DOMAIN, messageData)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    resolve(err);
                });
        })
    };

    this.welcomeVender = async (franchise_name, email, password) => {
        return new Promise((resolve, reject) => {
            const messageData = {
                from: 'harshit.moshimoshi@gmail.com',
                to: 'harshit.moshimoshi@gmail.com',
                subject: 'Welcome',
                text: 'Testing some Mailgun awesomeness!',
                html: `<!DOCTYPE html>
                <html>
                
                <head>
                    <title></title>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <style type="text/css">
                        body,
                        table,
                        td,
                        a {
                            -webkit-text-size-adjust: 100%;
                            -ms-text-size-adjust: 100%;
                        }
                
                        table,
                        td {
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                        }
                
                        img {
                            -ms-interpolation-mode: bicubic;
                        }
                
                        img {
                            border: 0;
                            height: auto;
                            line-height: 100%;
                            outline: none;
                            text-decoration: none;
                        }
                
                        table {
                            border-collapse: collapse !important;
                        }
                
                        body {
                            height: 100% !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            width: 100% !important;
                        }
                
                        a[x-apple-data-detectors] {
                            color: inherit !important;
                            text-decoration: none !important;
                            font-size: inherit !important;
                            font-family: inherit !important;
                            font-weight: inherit !important;
                            line-height: inherit !important;
                        }
                
                        @media screen and (max-width: 480px) {
                            .mobile-hide {
                                display: none !important;
                            }
                
                            .mobile-center {
                                text-align: center !important;
                            }
                        }
                
                        div[style*="margin: 16px 0;"] {
                            margin: 0 !important;
                        }
                    </style>
                
                <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
                    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Open Sans, Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
                        For what reason would it be advisable for me to think about business content? That might be little bit risky to have crew member like them.
                    </div>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                    <tr>
                                        <td align="center" valign="top" style="font-size:0; padding: 35px;" bgcolor="#F44336">
                                            <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                                    <tr>
                                                        <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;" class="mobile-center">
                                                            <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #ffffff;">Welcome ${franchise_name}</h1>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                            <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;" class="mobile-hide">
            
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                                <tr>
                                                    <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;"> <img src="https://img.icons8.com/carbon-copy/100/000000/checked-checkbox.png" width="125" height="120" style="display: block; border: 0px;" /><br>
                                                        <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;">Please use these credentials for login email:${email},password:${password}
                                                        Have a nice day, </h2>
                                                    </td>
                                                </tr>
                                                <tr>
                                                <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;"><br>
                                                    <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;">WEChimini</h2>
                                                </td>
                                            </tr>
                                        
            
                                               
                                            </table>
                                        </td>
                                    </tr>
                                  
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                
                </html>`
            };

            client.messages.create(DOMAIN, messageData)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    resolve(err);
                });
        })
    };

    this.orderConfirm = async (emailId,cust_name, order_id, total,order_create,shippingAmount,order) => {
        return new Promise((resolve, reject) => {
            let trData = "";
            let totalAmount = 0 ;
            for(let i = 0 ;i<order.products.length ;i++){
                totalAmount += order.products[i].productId.price * order.products[i].quantity ;
                trData += `<tr style="text-align: center;">
                                <td>${i+1}</td>
                                <td>${order.products[i].productId.productName}</td>
                                <td> ₹${order.products[i].productId.price}</td>
                                <td>${order.products[i].quantity}</td>
                                <td>₹${order.products[i].productId.price * order.products[i].quantity}</td>
                                <td>0%</td>
                                <td>GST</td>
                                <td>0.00</td>
                                <td>₹${order.products[i].productId.price * order.products[i].quantity}</td>
                            </tr>`
            }

            let tableData = `<table style="width: 100%; margin-top: 30px;">       
                <tr style="text-align: center;">
                <tr>
                <th>Sl. No</th>
                <th>Description</th>
                <th>Unit Price</th>
                <th>Qty</th>
                <th>Net Amount</th>
                <th>Tax Rate</th>
                <th>Tax Type</th>
                <th>Tax Amount</th>
                <th>Total Amount</th>
            </tr>
                </tr>`+trData+
                
                `<tr>
                    <td colspan="7"><b>Total</b></td>
                    <td style="text-align: center;">₹0.00</td>
                    <td style="text-align: center;">₹${totalAmount}</td>
                </tr>
                    <tr style="text-align: right;">
                    <td style="height: 70px;" colspan="9">
                    <b>WeChimni.org:</b> <br>
                    <b>Authorized Signatory</b>
                    </td>
                </tr>
                </table>` ;
            
          
            const messageData = {
                from: 'support@wechimni.org',
                to: emailId,
                subject: 'Order #'+order_id,
                text: 'Order confirmation',
                html: `<!DOCTYPE html>
                <html lang="en">
                
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Invoice</title>
                    <style>
                        table,
                        th,
                        td {
                            border: 1px solid black;
                            border-collapse: collapse;
                        }
                    </style>
                </head>
                
                <body style="padding: 20px">
                    <div style="border: 1px solid black; width: 700px; padding: 20px 80px; margin: auto;">
                
                        <div style="display: flex;">
                            <div style="width: 50%;">
                                <img height="150" src="https://www.wechimni.org/assets/images/wechimini/chiminilogo%20.png"
                                    alt="">
                                <p>
                                    <b>Tax Invoice/Bill of Supply/Cash Memo</b><br>
                                    <span>WeChimni</span> <br>
                                    <span>GTT Foundation</span><br>
                                    <span>311, 3rd Floor, City Space Bulding, </span><br>
                                    <span>Above Unnati Mahindra Showroom,</span><br>
                                    <span>Nagar Road, WadgaonSheri,</span><br>
                                    <span>Marketed By and Sold Through:</span><br>
                                    <span>PUNE, MAHARASHTRA -411014</span>
                                </p>
                                <p><b>PAN No:</b> <span>IULLDKFGJG</span></p>
                                <p><b>GST Registration No:</b> <span>IULLDKFGJG</span></p>
                                <p><b>Dynamic QR Code:</b></p>
                
                                <div style="text-align: center; margin-top: 60px;">
                                    <p><b>Order Number:</b> <span>#${order_id}</span></p>
                                    <p><b>Order Date:</b> <span>${order_create.toISOString().replace('T', ' ').substring(0, 19)}</span></p>
                                </div>
                            </div>
                            <div style="width: 50%; text-align: right;">
                                <p>
                                    <b>Tax Invoice/Bill of Supply/Cash Memo</b><br>
                                    <span>(Original for Recipient)</span>
                                </p>
                
                                <p>
                                    <b>Billing Address :</b> <br>
                                    <span>${order.shippingAddress.name}</span><br>
                                    <span>${order.shippingAddress.address}</span> <br>
                                    <span>${order.shippingAddress.state}</span><br>
                                    <span>${order.shippingAddress.country}</span><br>
                                    <span>${order.shippingAddress.city}</span> <br>
                                    <span>IN</span><br>
                                    <span>State/UT Code:27</span>
                                </p>
                
                                <p>
                                    <b>Shipping Address :</b> <br>
                                    <span>${order.shippingAddress.name}</span><br>
                                    <span>${order.shippingAddress.address}</span> <br>
                                    <span>${order.shippingAddress.state}</span><br>
                                    <span>${order.shippingAddress.country}</span><br>
                                    <span>${order.shippingAddress.city}</span> <br>
                                    <span>IN</span><br>
                                    <span>State/UT Code:27</span>
                                </p>
                
                                <p>
                                    <b>Place of supply:</b> ${order.shippingAddress.city} <br>
                                    <b>Place of delivery:</b> ${order.shippingAddress.city} <br>
                                    <b>Place of delivery:</b> Order Number: ${order_id} <br>
                                    <b>Invoice Number:</b> BOM7-12952 <br>
                                    <b>Order Date:</b> ${order_create.toISOString().replace('T', ' ').substring(0, 19)}<br>
                                    <b>Invoice Details:</b> MH-PNQ-1-001-01 <br>
                                    <b>Invoice Date :</b> ${order_create.toISOString().replace('T', ' ').substring(0, 19)}
                                </p>
                
                            </div>
                        </div>`+tableData+`
                
                        
                        <span>Whether tax is payable under reverse charge - No</span>
                    </div>
                </body>
                
                </html>`
            };

            client.messages.create(DOMAIN, messageData)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    resolve(err);
                });
        })
    };

    this.newsData = async (email_id) => {
        return new Promise((resolve, reject) => {
            const messageData = {
                from: email_id,
                to: 'support@wechimni.org',
                subject: 'NewsLetter',
                text: email_id,
            };

            client.messages.create(DOMAIN, messageData)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    resolve(err);
                });
        })
    };

   
// }
