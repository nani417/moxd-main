var fs = require('fs')
const Deliveryboy = require("../../models").deliver_boy_master;
const Assignboy = require("../../models").assign_deliveryboy;
const path = require('path');
const Sequelize = require('sequelize');
var async = require('async');
const { response } = require('express');
const env = process.env.NODE_ENV || 'development';
const OrderTransaction = require("../../models").order_transactions;
const Frenchise = require("../../models").Frenchise;
const CityMasters = require("../../models").city_masters;
const ADMIN_WALLET = require("../../models").adminwallet;
const FRENCHISE_RATE_MASTER = require("../../models").Frenchise_rate_master;
const COUPON = require("../../models").Coupon;
const DRS_DATA = require("../../models").drs_data;
const CONSTANTS = require('../../config/constants');
const { Logform } = require('winston');
const COMPLAINT_MASTER = require("../../models").complaint_master;
//var rp = require('request-promise');
const Op = Sequelize.Op;
//const Assignboy = require("../models").assign_deliveryboy;

class QueryHandler {
    constructor() {

    }

 Createdeliveryboy(data) {

    return new Promise(async (resolve, reject) => {
        try {
            console.log("  Request received")
            var reqDelivery_boy = {
                //frenchise_id: data.frenchise_id,
                delivery_boy_name: data.delivery_boy_name,
            };
            Deliveryboy.create(reqDelivery_boy).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            });

        } catch (error) {
            console.log(error)
            reject(error);
        }
    });

}

CreateAssign(request) {

    return new Promise(async (resolve, reject) => {
        try {
            let drs_no = Math.floor((Math.random() * 1000000) + 1)
            DRS_DATA.create({
                drs_no:drs_no
            }).then(response=>{
                request.forEach(data =>{
                    var reqAssign = {
                        drs_no:drs_no,
                        date_time: data.date_time,
                        delivery_boy_id: data.delivery_boy_id,
                        area_id: data.area_id,
                        c_note_no: data.c_note_no,
                        weight: data.weight,
                        width: data.width,
                        no_pcs: data.no_pcs,
                        receiver_name: data.receiver_name,
                        receiver_mobile: data.receiver_mobile,
                        remarks: data.remarks,
                        franchise_id:data.franchise_id,
                        delivery_status:"Dispatched",                        
                    };                    
                    Assignboy.findOne({
                        where:{
                            c_note_no:data.c_note_no
                        }
                    }).then(response=>{                        
                        if(!response.c_note_no){                            
                            Assignboy.create(reqAssign).then(res => {        
                                resolve(res)
                            }).catch(error => {
                                console.log(error)
                                reject(error)
                            });
                        }else{
                            reject('c_note is already there')
                        }
                    })                   
                // })                
                
            })
        })

        } catch (error) {
            console.log(error)
            reject(error);
        }
    });
}

deliveryCNoteList(data){
    return new Promise((resolve,reject)=>{
        try{
                        
                Assignboy.findOne({
                    where:{
                        c_note_no:{ [Op.in]: data.c_note_no }
                    }
                }).then(response=>{
                    if(response){
                        reject(`c_node ${response.c_note_no} is already assigned`)
                        reject('c_node is already assigned')
                    }else{                                               
                           OrderTransaction.findAll({                            
                                where:{
                                    c_node_no:{ [Op.in]: data.c_note_no },
                                },  
                                subQuery: false,                                                           
                                attributes: ['id','booking_type','pickup_date','package_type','c_node_no','payment_mode','booking_mode','pickup_name','pickup_mobile','pickup_pincode','pickup_address','delivery_name','delivery_mobile','delivery_pincode','weight','package_value','amount','gst_no','no_pcs'],                                                                
                             include:[{
                                 model:Frenchise, 
                                 attributes:['id','ContactPersion','MobileNumber','Email','BusinessName','Address','State'],
                                 include:[{                                    
                                     model:CityMasters,
                                     attributes:['id','city_name','regional_id']
                                 }],                                 
                             }],                             
                            }).then(res=>{
                                    resolve(res)
                            })
                    }
                })
        }catch(err){
            reject(err)
        }
    })
}
CourierDeliveryList(data) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("Req ",data)
            let conditions={}
            let conditionCityId={}
            let tracking_condition={}
            if(data.delivery_boy_id != undefined)
                conditions.delivery_boy_id=data.delivery_boy_id
            if(data.drs_no != undefined)
                conditions.drs_no=data.drs_no
            if(data.franchise_id != undefined)
                conditions.franchise_id = data.franchise_id
            if(data.area_id != undefined)
                conditions.area_id = data.area_id
            if(data.delivery_status != undefined) 
                conditions.delivery_status=data.delivery_status            
            if(data.dateFrom != undefined && data.dateTo != undefined)
                tracking_condition.createdAt = {[Op.between]: [new Date( data.createdAtFrom+" 00:00:00"),new Date(data.createdAtTo+" 23:59:59")]}
            Assignboy.findAll({
                order:[['createdAt','DESC']],                
                    where: conditions,
                     attributes: ['id','weight','c_note_no','receiver_name','receiver_mobile','delivery_status','drs_no','receipt_img_url'],
                     include:[{
                        model:DRS_DATA
                     }]
                }).then(response => {
                    resolve(response)
                }).catch(error => {
                    console.log(error)
                    reject(error)
                });

        } catch (error) {
            console.log(error)
            reject(error);
        }
    });
}

ListOfDeliveryBoy(data) {
    console.log("Welcome to query")
    return new Promise(async (resolve, reject) => {
        try {
            Deliveryboy.findAll({
                    where: {
                        name: {
                            [Op.like]: "%" + data.delivery_boy_name + "%",
                        },
                        frenchise_id:data.frenchise_id
                    }, attributes: ['id', 'name','frenchise_id'],
                }).then(response => {
                    resolve(response)
                }).catch(error => {
                    console.log(error)
                    reject(error)
                });

        } catch (error) {
            console.log(error)
            reject(error);
        }
    });
}



reachargeWallet(data) {
    return new Promise((resolve, reject) => {
      try {
        if (data.walletamount != undefined) {
          ADMIN_WALLET.findOne({
            attributes: ["walletamount"],
            where: {
              frenchise_id: data.frenchise_id,
              //frenchise_id:data.frenchise_id
            },
            order: [["createdAt", "DESC"]],
          }).then((result) => {
            //resolve(result)
            let wallet_amount = 0;
            if (result) {
              console.log("Crdit amount");
              wallet_amount = result.walletamount;
            }
            console.log("Wallet Amount", wallet_amount);

            let reqData = {
              type: "Cr",
              frenchise_id: data.frenchise_id,
              trans_frenchiseid: data.trans_frenchiseid,
              walletamount:
                parseInt(wallet_amount) + parseInt(data.walletamount),
                debit_credit:parseInt(data.walletamount)
            };
            console.log("Request Data", reqData);

            ADMIN_WALLET.create(reqData)
              .then((respon) => {
                resolve(respon);
              })
              .catch((err) => {
                reject(err);
              });
          });
        } else {
          // ADMIN_WALLET.findOne({
          //   where: { frenchise_id: data.frenchise_id },
          //   order: [["createdAt", "DESC"]],
          // }).then((respo) => {
          //   let payload = {
          //     type: data.type,
          //     frenchise_id: data.frenchise_id,
          //     trans_frenchiseid: data.trans_frenchiseid,
          //     active_status: data.active_status,
          //     weight: data.weight,
          //     debit_credit: data.debit_credit,
          //     walletamount: "",
          //   };
          //   if (data.type == "credit") {
          //     let wallet_amount =
          //       parseInt(respo.walletamount) + parseInt(data.debit_credit);
          //     console.log("Credit", wallet_amount);
          //     payload.walletamount = wallet_amount;
          //     ADMIN_WALLET.create(payload)
          //       .then((result) => {
          //         resolve(result);
          //       })
          //       .catch((err) => {
          //         reject(err);
          //       });
          //   } else {
          //     let wallet_amount =
          //       parseInt(respo.walletamount) - parseInt(data.debit_credit);
          //     if (respo.walletamount > data.debit_credit) {
          //       console.log("Debit", wallet_amount);
          //       payload.walletamount = wallet_amount;
          //       ADMIN_WALLET.create(payload)
          //         .then((result) => {
          //           resolve(result);
          //         })
          //         .catch((err) => {
          //           reject(err);
          //         });
          //     } else {
          //       reject('not enough balance')
          //       console.log('not enough balance');
          //     }
          //   }
          // });
        }
      } catch (err) {
        reject(err);
      }
    });
  }
  createComplaint(data){
    return new Promise((resolve,reject)=>{
        try{
            data.c_note.forEach(element => {

                let complaint ={
                    FrenchiseFrom:data.FrenchiseFrom,
                    FrenchiseTo:data.FrenchiseTo,
                    complaint_message:data.complaint_message,
                    firstName:data.firstName,
                    lastName:data.lastName,
                    c_note:element,
                    tracking_number:data.tracking_number,
                }
                COMPLAINT_MASTER.create(complaint).then(response=>{
                    resolve(response)
                }).catch(err=>{
                    reject(err)
                })
            })
        }catch(err){
            reject(err)
        }
    })
  }
  complaintList(data){
    return new Promise((resolve,reject)=>{
        try{
            let conditions={}
            if(data.c_note != undefined)
                conditions.c_note=data.c_note
            if(data.dateFrom != undefined && data.dateTo != undefined)
                conditions.createdAt = {[Op.between]: [new Date( data.dateFrom+" 00:00:00"),new Date(data.dateTo+" 23:59:59")]}
            if(data.complaint_type!=undefined){
                if(data.complaint_type=="raise")
                    conditions.FrenchiseFrom = data.frenchise_id                    
                else
                    conditions.FrenchiseTo = data.frenchise_id
            }
            COMPLAINT_MASTER.findAll({
                where:conditions                
            }).then(response=>{
                resolve(response)
            }).catch(Err=>{
                reject(Err)
            })
        }catch(err){
            reject(err)
        }
    })
  } 
  couponCreation(data){
    return new Promise((resolve,reject)=>{
        try{
            let coupon={
                coupon_title:data.coupon_title,
                coupon_desc:data.coupon_desc,
                coupon_code:data.coupon_code,
                starting_date:data.starting_date,
                ending_date:data.ending_date,
                type:data.type,
                percentage:data.percentage,
                amount:data.amount,
            }
            if(data.id != undefined){
                COUPON.update(coupon,{where:{id:data.id}}).then(response=>{
                    resolve(response)
                }).catch(er=>{
                    reject(er)
                })
            }else{
                COUPON.create(coupon).then(response=>{
                resolve(response)
            }).catch(err=>{
                reject(err)
            })
            }
        }catch(err){
            reject(err)
        }
    })
  }
  couponDetails(data){
    return new Promise((resolve,reject)=>{
        try{
            COUPON.findOne({
                where:{
                    coupon_code:data.coupon_code
                }                
            }).then(response=>{
                resolve(response)
            }).catch(err=>{
                reject(err)
            })
        }catch(Err){
            reject(Err)
        }
    })
  }

  
//   FrenchiseRateMaster(data){
//     return new Promise((resolve,reject)=>{
//         try{
//             let weight=0
//             let amount_weight=0
//             let c_note_count=0
//             let amount_c_note=0
//             if(data.status==true){
//                 weight = data.weight
//                 amount_weight=data.amount_weight
//             }else{
//                 c_note_count=data.c_note_count,
//                 amount_c_note = data.c_note_amount
//             }                      
//             FRENCHISE_RATE_MASTER.create({
//                 delivery_type:data.delivery_type,
//                 weight:weight,
//                 amount_weight:amount_weight,
//                 c_note_count:c_note_count,
//                 amount_c_note:amount_c_note,
//                 status:data.status
//             }).then(response=>{
//                 resolve(response)
//             }).catch(err=>{
//                 reject(err)
//             })
//         }catch(err){
//             reject(err)
//         }
//     })
//   }
FrenchiseRateMaster(data){
    return new  Promise((resolve,reject)=>{
        try{
            let weight=0
            let amount_weight=0
            let c_note_count=0
            let amount_c_note=0
            if(data.status==true){
                weight = data.weight
                amount_weight=data.amount_weight
            }else{
                c_note_count=data.c_note_count,
                amount_c_note = data.c_note_amount
            }
            FRENCHISE_RATE_MASTER.findOne({
                where:{delivery_type:data.delivery_type}
            }).then(respons=>{
                if(respons){
                    reject('already created')
                }else{
                    FRENCHISE_RATE_MASTER.create({
                       delivery_type:data.delivery_type.toUpperCase(),
                       weight:weight,
                       amount_weight:amount_weight,
                       c_note_count:c_note_count,
                       amount_c_note:amount_c_note,
                       status:data.status
                   }).then(response=>{
                       resolve(response)
                   }).catch(err=>{
                       reject(err)
                   })
                }
            })
        }catch(err){
            reject(err)
        }
    })
}
FrenchiseRateMasterList(data){
    return new Promise((resolve,reject)=>{
        try{
            let condition={}
            if(data.dateFrom != undefined && data.dateTo != undefined)
            condition.createdAt = {[Op.between]: [new Date( data.dateFrom+" 00:00:00"),new Date(data.dateTo+" 23:59:59")]}

            FRENCHISE_RATE_MASTER.findAll({
                where:condition,
            }).then(resp=>{
                resolve(resp)
            }).catch(err=>{
                reject(err)
            })
        }catch(err){
            reject(err)
        }
    })
}
deleteCoupon(data){
    return new Promise((resolve,reject)=>{
        try{
            COUPON.destroy({
                where:{id:data.id}
            }).then(response=>{
                resolve(response)
            }).catch(err=>{
                reject(err)
            })
        }catch(err){
            reject(err)
        }
    })
}
applyCoupon(data){
    return new Promise((resolve,reject)=>{
        try{
            COUPON.findOne({
                where:{
                    coupon_code:data.coupon_code,
                    type:data.type
                },
                attributes:['coupon_code','coupon_title','amount','percentage']
            }).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        }catch(err){
            reject(err)
        }
    })
}
couponList(data){
    return new Promise((resolve,reject)=>{
        try{
            let condition={}
            if(data.dateFrom != undefined && data.dateTo != undefined)
                condition.createdAt = {[Op.between]: [new Date( data.createdAtFrom+" 00:00:00"),new Date(data.createdAtTo+" 23:59:59")]}
            COUPON.findAll({
                where:condition,
                attributes:['id','coupon_title','coupon_desc','coupon_code','starting_date','ending_date','type','percentage','amount']
            }).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        }catch(Err){
            reject(Err)
        }
    })
}
}
module.exports = new QueryHandler();