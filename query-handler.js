const PincodeDistance = require("./pincode/index").default
const pincode = require("pincode");
var zipcodes = require('zipcodes');
const { lookup } = require('pincode-lookup-india');

const PinDistance = new PincodeDistance();
const ADMIN_WALLET = require("../models").adminwallet;
const DELIVERY_BOY_MASTER = require("../models").deliver_boy_master;
const Frenchise = require("../models").Frenchise;
const BankDetails = require("../models").BankDetails;
const DocumentMaster = require("../models").DocumentMaster;
const RateMaster = require("../models").rate_master;
const Weights = require("../models").weights;
const Distances = require("../models").distances;
const RoleMaster = require("../models").role_master;
const ModuleMaster = require("../models").module_master;
const MappingRole = require("../models").role_mapping;
const Regional = require("../models").regional;
const AreaCreation = require("../models").area_master;
const CityCreation = require("../models").city_masters;
const Address = require("../models").address;
const DRS_DATA = require("../models").drs_data;
const { welcomeEmail } = require("./mail");
const Users = require("../models").users;
const MoxdWallet = require("../models").moxd_wallet;
var md5 = require('md5');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const userPermissionsDetails = require("../models").UserPermissionDetails;
const userPermissions = require("../models").UserPermissions;
const UsesRole = require("../models").UserRoles;
const uuidv4 = require('uuid/v4');
var async = require('async');
var rp = require('request-promise');
const passport = require('passport');
const crypto = require('crypto');
var logger = require('../logger')('UserQuery');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '../../config/config.json')[env];
let jwt = require('jsonwebtoken');
var json2xls = require('json2xls');
var fs = require('fs')
const path = require('path');
const { CostExplorer } = require("aws-sdk");
const role_mapping = require("../models/role_mapping");
const { resolve } = require("path");
const { use } = require("passport");
const { where } = require("sequelize");
const OrderTransaction = require("../models").order_transactions;
const CityMaster = require("../models").city_masters;

const op = Sequelize.Op;
const csc = require('countries-states-cities').default
const ASSING_DELIVERY_BOY = require("../models").assign_deliveryboy;




class QueryHandler {
    constructor() {
    }

    login(data, req, res, next) {
        return new Promise(async (resolve, reject) => {
            try {
                passport.authenticate('local', { session: false }, (err, passportUser, info) => {
                    if (err) {
                        return next(err);
                    }
                    console.log(passportUser);
                    if (passportUser) {
                        Frenchise.findAll({
                            where: {
                                Mobilenumber: data.Mobilenumber,
                                IsActive: true
                            }, attributes: ['MobileNumber', 'Email'],
                            include: [{
                                model: Regional,
                                subQuery: false,
                                attributes: ['id', 'region_name'],
                            }, {
                                model: CityCreation,
                                subQuery: false,
                                attributes: ['id', 'role_name'],
                            }, {
                                model: MappingRole,
                                subQuery: false,
                                attributes: ['id'],
                                include: [{
                                    model: ModuleMaster,
                                    subQuery: false,
                                    attributes: ['module_name', 'update_module', 'veiw_module', 'delete_module'],
                                }],

                            }]
                        }).then(userData => {
                            if (userData.length > 0) {
                                var respons = Frenchise.toAuthJSON(userData[0]);
                                var result = []
                                result.push(respons.token)
                                result.push(respons.UserData)
                                resolve(result);
                            } else
                                resolve(null);
                        }).catch(err => {
                            console.log(err);
                            reject(err);
                        });

                    } else
                        resolve(null)

                })(req, res, next);

            } catch (error) {
                reject(error);
            }
        });
    }

    auth(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (data.token) {

                    jwt.verify(data.token, 'okdollar@123#@!cgmkumar', (err, tokenData) => {
                        if (err) {
                            resolve(null)
                        } else {
                            resolve(tokenData)
                        }
                    });
                } else {
                    reject(true)
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    userRoleList() {
        return new Promise(async (resolve, reject) => {
            try {
                UsesRole.findAll({
                    where: {
                        IsActive: true,
                        IsDeleted: false
                    },
                    attributes: ['Id', 'UserType', 'Value']
                }).then(userData => {
                    if (userData.length > 0)
                        resolve(userData);
                    else
                        reject(userData);
                }).catch(err => {
                    console.log(err);
                    reject(err);
                });

            } catch (error) {
                reject(error);
            }
        });
    }

    userModuleList() {
        return new Promise(async (resolve, reject) => {
            try {
                userPermissions.findAll({
                    where: {
                        IsActive: true,
                        IsDeleted: false
                    },
                    attributes: ['Id', 'ModuleName', 'Value']
                }).then(userData => {
                    if (userData.length > 0)
                        resolve(userData);
                    else
                        reject(userData);
                }).catch(err => {
                    console.log(err);
                    reject(err);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    GetAllUserList() {
        var result = []
        var conditionsUserType = {
            IsActive: true,
            IsDeleted: false,
        }

        return new Promise(async (resolve, reject) => {
            try {
                Users.findAll({
                    attributes: ['Id', 'Name', 'MobileNumber', 'Email'],
                }).then(userData => {
                    resolve(userData)
                }).catch(err => {
                    reject(err);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    GetUserList(data) {
        var result = []
        var limits = data.Limit;
        let offsets = (data.Page - 1) * limits

        var conditions = {
            IsDeleted: false,
        }

        var conditionsUserType = {
            IsActive: true,
            IsDeleted: false,
        }
        var conditionsTransationType = {
            IsActive: true,
            IsDeleted: false,
        }

        if (typeof data.Status != 'undefined') {
            if (data.Status == 0 || data.Status == 1)
                conditions.IsActive = data.Status
        }

        if (typeof data.NameMobileNumberIds != 'undefined') {
            conditions.Id = { [Sequelize.Op.in]: data.NameMobileNumberIds }
        }

        if (typeof data.UserTypeIds != 'undefined') {
            conditionsUserType.Id = { [op.in]: data.UserTypeIds }
        }

        if (typeof data.TransactionTypeIds != 'undefined') {
            conditionsTransationType.Id = { [op.in]: data.TransactionTypeIds }
        }

        return new Promise(async (resolve, reject) => {
            try {
                Users.findAll({
                    group: ['Id'],
                    attributes: ['Id', Sequelize.fn('count', Sequelize.col('Id'))],
                    where: conditions,
                }).then(count => {
                    logger.info("===============Welcome==============");

                    if (typeof count != 'undefined' && count.length > 0) {
                        console.log("Count  ::  " + count.length);
                        Users.findAll({
                            limit: limits,
                            offset: offsets,
                            where: conditions,
                            attributes: ['Id', 'Name', 'MobileNumber', 'updatedAt', 'IsActive'],
                            include: [{
                                model: UsesRole,
                                attributes: ['Id', 'UserType', 'Value'],
                                where: conditionsUserType,

                            }, {
                                subQuery: false,
                                model: userPermissionsDetails,
                                attributes: ['Id'],
                                include: [{
                                    where: conditionsTransationType,
                                    model: userPermissions,
                                    attributes: ['Id', 'ModuleName', 'Value'],
                                }]
                            }],

                        }).then(userData => {

                            result.push(count.length)
                            result.push(userData)
                            resolve(result)
                            //callback(false, userData);
                        }).catch(err => {
                            console.log(err);
                            reject(err);
                        });
                    } else {
                        logger.info("===============check==============");
                        result.push(0)
                        result.push([])
                        resolve(result)
                    }

                }).catch(err => {
                    logger.info(err);
                    result.push(0)
                    result.push([])
                    resolve(result)
                });

            } catch (error) {
                logger.info("===============check3==============");
                reject(error);
            }
        });
    }

    register(body) {

        return new Promise(async (resolve, reject) => {
            try {
                let salt = crypto.randomBytes(16).toString('hex');
                var reqUser = {
                    Address: body.Address,
                    BusinessName: body.BusinessName,
                    ContactPersion: body.ContactPersion,
                    MobileNumber: body.MobileNumber,
                    Email: body.Email,
                    Description: body.Description,
                    State: body.State,
                    District: body.District,
                    Pincode: body.Pincode,
                    Lat: body.Lat,
                    Lang: body.Lang,
                    Hub_id: body.Hub_id,
                    Hub_type: body.Hub_type,
                    city_id: body.city_id,
                    GST: body.GST,
                    Language: body.Language,
                    Salt: salt,
                    Hash: crypto.pbkdf2Sync(body.Password, salt, 100, 512, 'sha512').toString('hex')
                };
                console.log("Salt Register ", salt)
                console.log("Hash Register ", reqUser.Hash)

                console.log(reqUser)
                Frenchise.findAll({ where: { MobileNumber: body.MobileNumber } }).then(respons => {
                    if (respons.length > 0) {
                        reject({ "message": "Mobile No. already registered " })
                    } else {
                        //reject({"message":"Registered successfully "})

                        Frenchise.create(reqUser).then(responsCreate => {
                            console.log("Success response : ", responsCreate.id)
                            Frenchise.setPassword(body.Password)
                            Frenchise.update({
                                city_id: body.city_id,
                                Role_Id: "f6c3d887-4b37-45d9-9c50-f3965590411f",
                                IsActive: 1
                            }, {
                                where: {
                                    id: responsCreate.id
                                }
                            }).then(response => {

                            })

                            ADMIN_WALLET.create({
                                frenchise_id: responsCreate.id,
                                debit_credit: "0",
                                type: "Cr",
                                walletamount: 0,
                                trans_frenchiseid: "xxxxxxxx"
                            }).then(response => {


                                resolve(respons)
                            }).catch(err => {
                                console.log(" Failure response : ")
                                console.log(err)
                                reject(err);
                            });
                        })
                    }
                })
                // Frenchise.setPassword(body.Password)


            } catch (error) {
                reject(error);
            }
        });
    }

    FrenchiseLogin(data) {

        return new Promise(async (resolve, reject) => {
            try {
                // console.log("login user ",data.MobileNumber)
                Frenchise.findOne({
                    where: { MobileNumber: data.MobileNumber }
                }).then(function (result) {

                    //console.log("Result : ",result)
                    if (!Frenchise || !Frenchise.validatePassword(data.Password, result.Salt, result.Hash)) {
                        // console.log("Reject")
                        reject('email or password is invalid')
                        //return done(null, false, { errors: { 'email or password': 'is invalid' } });
                    } else {
                        Frenchise.findAll({
                            attributes: ['id', 'MobileNumber', 'ContactPersion', 'Email', 'State', 'District', 'Pincode', 'Lat', 'Lang', 'ApprovedStatus', 'Hub_id', 'Hub_type'],
                            required: false,
                            where: { MobileNumber: data.MobileNumber },
                            include: [{
                                model: Regional,
                                subQuery: false,
                                attributes: ['id', 'region_name'],
                            }, {
                                model: CityCreation,
                                subQuery: false,
                                attributes: ['id', 'city_name', 'regional_id'],

                            }, {
                                model: RoleMaster,
                                subQuery: false,
                                attributes: ['id', 'role_name'],
                            }, {
                                model: MappingRole,
                                subQuery: false,
                                attributes: ['id'],
                                include: [{
                                    model: ModuleMaster,
                                    subQuery: false,
                                    attributes: ['module_name', 'update_module', 'veiw_module', 'delete_module'],
                                }],

                            }]
                        }).then(response => {
                            if (response.length) {
                                data = {
                                    MobileNumber: result.MobileNumber,
                                    Id: result.id
                                }
                                let token_response = Frenchise.toAuthJSON(data)

                                //console.log("Resolved",JSON.stringify(response[0]['ApprovedStatus']))
                                if (response[0]['ApprovedStatus'])
                                    resolve(response)
                                else
                                    reject({ "message": "User Not Approved" })
                                // resolve(response)
                            } else {
                                reject({ "message": "service is not available in our database" })
                            }
                        }).catch(error => {
                            reject(error)
                        });

                        // data = {
                        //     MobileNumber:result.MobileNumber,
                        //     Id:result.id
                        // }
                        // let token_response = Frenchise.toAuthJSON(data)
                        // //console.log("Resolved",token_response)
                        // resolve(token_response)
                    }

                }).catch(error => {
                    reject(error)
                });

            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * ApprovedBy : Who is given approved from admin
     * ApprovedStatus : Approved status approved / rejecrt
     * Regisger_with : Register with under Region 
     * Register_type : link with Region Id
     * @param { } data 
     * @returns 
     */
    ApproveFranchise(data) {

        return new Promise(async (resolve, reject) => {
            try {
                console.log("Update user ")
                Frenchise.update(
                    { ApprovedBy: data.ApprovedBy, ApprovedStatus: data.ApprovedStatus, Register_With: data.Register_With.toUpperCase(), RegisterType: data.RegisterType },
                    { returning: true, where: { id: data.User_Id } }
                ).then(function (rowsUpdated) {
                    console.log(rowsUpdated)
                    if (rowsUpdated[1] == 1)
                        resolve(rowsUpdated)
                    else
                        resolve(null)
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

    UpdateDocument(data) {

        return new Promise(async (resolve, reject) => {
            try {
                console.log("  Request received")
                var reqDocument = {
                    User_Id: data.User_Id,
                    PanNumber: data.PanNumber,
                    PanImage: data.PanImage,
                    AadharNo: data.AadharNo,
                    AadharImageFront: data.AadharImageFront,
                    AadharImageBack: data.AadharImageBack
                };
                console.log(reqDocument)
                DocumentMaster.create(reqDocument).then(response => {
                    console.log("Success response : ")
                    console.log(response)
                    console.log(data.User_Id)
                    Frenchise.update(
                        { Document_Id: response.id },
                        { returning: true, where: { id: data.User_Id } }
                    ).then(function (rowsUpdated) {
                        console.log(rowsUpdated)
                        if (rowsUpdated[1] == 1)
                            resolve(rowsUpdated)
                        else
                            resolve(null)
                    }).catch(error => {
                        console.log(error)
                        reject(error)
                    });
                }).catch(err => {
                    console.log(" Failure response : ")
                    console.log(err)
                    reject(err);
                });

                // Frenchise.update(
                //     {Bank_id: data.ApprovedBy},
                //     {returning: true,where: {MobileNumber: data.MobileNumber}}
                //   ).then(function(rowsUpdated) {
                //     console.log(rowsUpdated)
                //     if(rowsUpdated[1] == 1)
                //         resolve(rowsUpdated)
                //     else 
                //         resolve(null)
                //   }).catch(error =>{
                //     console.log(error)
                //     reject(error)
                //   }) ;

            } catch (error) {
                console.log(error)
                reject(error);
            }
        });
    }

    UpdateBank(data) {

        return new Promise(async (resolve, reject) => {
            try {
                console.log("  Request received")
                var reqBank = {
                    User_Id: data.User_Id,
                    AccountNumber: data.AccountNumber,
                    IFSC_Code: data.IFSC_Code
                };
                console.log(reqBank)
                BankDetails.create(reqBank).then(response => {
                    console.log("Success response : ")
                    console.log(response)
                    console.log(data.User_Id)
                    Frenchise.update(
                        { Bank_id: response.id },
                        { returning: true, where: { id: data.User_Id } }
                    ).then(function (rowsUpdated) {
                        console.log(rowsUpdated)
                        if (rowsUpdated[1] == 1)
                            resolve(rowsUpdated)
                        else
                            resolve(null)
                    }).catch(error => {
                        console.log(error)
                        reject(error)
                    });
                }).catch(err => {
                    console.log(" Failure response : ")
                    console.log(err)
                    reject(err);
                });

                // Frenchise.update(
                //     {Bank_id: data.ApprovedBy},
                //     {returning: true,where: {MobileNumber: data.MobileNumber}}
                //   ).then(function(rowsUpdated) {
                //     console.log(rowsUpdated)
                //     if(rowsUpdated[1] == 1)
                //         resolve(rowsUpdated)
                //     else 
                //         resolve(null)
                //   }).catch(error =>{
                //     console.log(error)
                //     reject(error)
                //   }) ;

            } catch (error) {
                console.log(error)
                reject(error);
            }
        });
    }

    NewPassword(data) {

        return new Promise(async (resolve, reject) => {
            var salt = crypto.randomBytes(16).toString('hex');
            var Hash = crypto.pbkdf2Sync(data.NewPassword, salt, 100, 512, 'sha512').toString('hex');

            console.log("salt  : " + salt)
            console.log("hash  : " + Hash)
            console.log("mobile   : " + data.MobileNumber)
            console.log("hash  : " + data.NewPassword)
            try {
                Frenchise.update(
                    { Salt: salt, Hash: Hash },
                    { returning: true, where: { MobileNumber: data.MobileNumber } }
                ).then(function (rowsUpdated) {
                    console.log(rowsUpdated)
                    if (rowsUpdated[1] == 1)
                        resolve(rowsUpdated)
                    else
                        resolve(null)
                }).catch(error => {
                    console.log(error)
                    reject(error)
                });

            } catch (error) {
                reject(error);
            }
        });
    }

    SendOTP(data) {

        return new Promise(async (resolve, reject) => {
            try {
                var OTPNumber = Math.floor((Math.random() * 1000000) + 1);
                // var content = "Auto Payment OTP is " + OTPNumber;
                // var options = {
                //     method: 'POST',
                //     uri: 'http://advertisement.api.okdollar.org/AdService.svc/SendSmsGeneric',
                //     headers: { "Content-Type": "application/json" },
                //     body: {
                //         "MobileNumber": data.MobileNumber,
                //         "PackageName": "AutoPayment",
                //         "SmsContent": content
                //     },
                //     json: true
                // };
                if (OTPNumber) {
                    resolve(OTPNumber)
                } else {
                    reject(true)
                }
                // rp(options)
                //     .then(function (response) {
                //         if (response.Code == 200) {
                //             // Users.update(
                //             //     {
                //             //         OTP: OTPNumber,
                //             //         updatedAt: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
                //             //     },
                //             //     {
                //             //         where: { MobileNumber: data.MobileNumber }
                //             //     }).then(success => {
                //             //         if (success[0] == 1)
                //             //             resolve(success)
                //             //         else
                //             //             resolve(null)
                //             //     }).catch(err => {
                //             //         //callback(true, err);
                //             //         reject(err);

                //             //         //callback(true, err);
                //             //     })
                //             resolve(response);

                //         } else {
                //             reject(true);
                //         }
                //     }).catch(function (err) {
                //         reject(true);
                //     });

            } catch (error) {
                reject(error);
            }
        });
    }

    VerifyOTP(data) {

        return new Promise(async (resolve, reject) => {
            try {
                // Users.findOne({
                //     where: {
                //         MobileNumber: data.MobileNumber,
                //         OTP: data.OTP
                //     }
                // }).then(userData => {
                //     if (userData)
                //         resolve(userData)
                //     else
                //         resolve(null)
                // }).catch(err => {
                //     console.log(err);
                //     reject(err)
                // });
                if (data.otp) {
                    resolve('successfully')
                } else {
                    reject(true)
                }

            } catch (error) {
                reject(error);
            }
        });
    }

    ChangePassword(data) {

        return new Promise(async (resolve, reject) => {
            try {
                Users.findOne({ where: { Id: data.UserId } })
                    .then((user) => {
                        if (user) {
                            var salt = crypto.randomBytes(16).toString('hex');
                            var HashNew = crypto.pbkdf2Sync(data.NewPassword, salt, 100, 512, 'sha512').toString('hex');
                            var HashOld = crypto.pbkdf2Sync(data.OldPassword, user.Salt, 100, 512, 'sha512').toString('hex');
                            console.log("New : " + HashNew);
                            console.log("Old : " + HashOld);
                            console.log("Old : " + data.UserId);
                            console.log("Old : " + user.Salt);
                            Users.update(
                                { Salt: salt, Hash: HashNew },
                                { returning: true, where: { Id: data.UserId, Hash: HashOld } }
                            ).then(function (rowsUpdated) {
                                console.log(rowsUpdated)
                                if (rowsUpdated[1] == 1)
                                    resolve(rowsUpdated)
                                else
                                    resolve(null)
                            }).catch(error => {
                                console.log(error)
                                reject(true)
                            });
                        } else {
                            resolve(null)
                        }
                    }).catch(err => {
                        console.log(err);
                        reject(err);
                    });



            } catch (error) {
                reject(error);
            }
        });
    }

    DeleteUser(data) {

        return new Promise(async (resolve, reject) => {
            try {

                Users.destroy({
                    where: {
                        Id: data.UserId,
                    }
                }).then(success => {
                    console.log(success)
                    if (success == 1)
                        resolve(success)
                    else
                        resolve(null)
                }).catch(err => {
                    //callback(true, err);
                    reject(err);

                    //callback(true, err);
                })

            } catch (error) {
                reject(error);
            }
        });
    }

    CreateRateMaster(data) {

        return new Promise(async (resolve, reject) => {
            try {
                console.log("  Request received")
                var reqRate = {
                    amount: data.amount,
                    weight_type: data.weight_type,
                    user_type: data.user_type,
                    from_weight: data.from_weight,
                    to_weight: data.to_weight,
                    from_distance: data.from_distance,
                    to_distance: data.to_distance
                };
                console.log(reqRate)
                RateMaster.create(reqRate).then(response => {

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

    AddWeight(data) {

        return new Promise(async (resolve, reject) => {
            try {

                var createWeight = {
                    weight_from: data.weight_from,
                    weight_to: data.weight_to,
                    name: data.name,
                };

                if (data.id != undefined) {
                    console.log("Welcome to update", data.id)
                    Weights.update(createWeight, { where: { id: data.id } }).then(response => {
                        console.log("Response ", response)
                        resolve(createWeight)
                    }).catch(error => {
                        console.log("Welcome ", error)
                        reject(error)
                    });
                } else {
                    console.log("Welcome to insert")
                    Weights.create(createWeight).then(response => {

                        resolve(response)
                    }).catch(error => {
                        console.log(error)
                        reject(error)
                    });
                }


            } catch (error) {
                console.log("Welcome to error")
                console.log(error)
                reject(error);
            }
        });
    }

    NearByFranchise(data) {

        let sequelize;
        if (config.use_env_variable) {
            sequelize = new Sequelize(process.env[config.use_env_variable], config);
        } else {
            sequelize = new Sequelize(config.database, config.username, config.password, config);
        }

        return new Promise(async (resolve, reject) => {
            try {
                let lat = 9.78779
                let lng = 11.5678
                let distance = 50
                sequelize.query("select id,BusinessName,State,District, ST_Distance_Sphere( point (" + data.lng + ", " + data.lat + "),point(Lang, Lat)) * .000621371192 as distance_in_miles from Frenchises having distance_in_miles >= " + data.distance + " order by distance_in_miles asc", { type: Sequelize.QueryTypes.SELECT })
                    .then(function (users) {
                        resolve(users)
                        // We don't need spread here, since only the results will be returned for select queries
                    })
            } catch (error) {
                console.log("Welcome to error")
                console.log(error)
                reject(error);
            }
        });
    }


    AddDistance(data) {

        return new Promise(async (resolve, reject) => {
            try {
                var createDistance = {
                    dist_from: data.dist_from,
                    dist_to: data.dist_to,
                    air_amount: data.air_amount,
                    surface_amount: data.surface_amount,
                    weight_id: data.weight_id
                };

                if (data.id != undefined) {
                    Distances.update(createDistance, { where: { id: data.id } }).then(response => {
                        resolve(response)
                    }).catch(error => {
                        console.log(error)
                        reject(error)
                    });
                } else {
                    Distances.create(createDistance).then(response => {
                        resolve(response)
                    }).catch(error => {
                        console.log(error)
                        reject(error)
                    });
                }


            } catch (error) {
                console.log(error)
                reject(error);
            }
        });
    }

    editDistance(data){
        return new Promise((resolve,reject)=>{
            console.log(data.id);
            try{
                Distances.update({
                    dist_from:data.dist_from,
                    dist_to:data.dist_to,
                    air_amount:data.air_amount,
                    surface_amount:data.surface_amount,
                    weight_id:data.weight_id,
                },{
                    where:{id:data.id}
                }).then(res=>{                    
                    resolve(res)
                }).catch(err=>{
                    console.log(err);
                    reject(err)
                })
            }catch(err){
                console.log(err);
                reject(err)
            }
        })
    }
    GetRateList(data) {

        return new Promise(async (resolve, reject) => {
            try {
                this.getDistance(data).then(response => {
                    if (response < 0) {
                        reject('wrong pin code')
                    } else {
                        console.log("Respnse ", response)
                        Weights.findAll({
                            required: false,

                            include: [{
                                model: Distances,

                                attributes: ['id','air_amount','surface_amount', 'dist_from', 'dist_to', 'weight_id'],
                            }]
                        }).then(response => {
                            if (response.length) {
                                resolve(response)
                            } else {

                                reject("service is not available in our database")
                            }
                        }).catch(error => {
                            console.log(error)
                            reject(error)
                        });


                    }
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

    GetDistanceById(data) {

        return new Promise(async (resolve, reject) => {
            try {
                Distances.findAll({
                    where: {
                        weight_id: data.weight_id
                    },
                }).then(weight_list => {
                    resolve(weight_list)
                }).catch(err => {
                    reject(err);
                })

            } catch (error) {
                console.log(error)
                reject(error);
            }
        });
    }

    GetWeight() {

        return new Promise(async (resolve, reject) => {
            try {
                Weights.findAll({
                }).then(weight_list => {
                    resolve(weight_list)
                }).catch(err => {
                    reject(err);
                })

            } catch (error) {
                console.log(error)
                reject(error);
            }
        });
    }


    GetRate(data) {

        return new Promise(async (resolve, reject) => {
            try {
                this.getDistance(data).then(response => {
                    if (response < 0) {
                        reject('wrong pin code')
                    } else {
                        console.log("Respnse ", response)
                        Weights.findAll({
                            required: false,
                            where: {
                                weight_from: {
                                    [Op.lte]: data.to_weight,
                                },
                                weight_to: {
                                    [Op.gte]: data.to_weight,
                                },
                            },
                            include: [{
                                model: Distances,
                                where: {
                                    dist_from: {
                                        [Op.lte]: response,
                                    },
                                    dist_to: {
                                        [Op.gte]: response,
                                    },
                                },
                                attributes: ['air_amount','surface_amount', 'dist_from', 'dist_to', 'weight_id'],
                            }],
                            order: [
                                ['weight_from', 'ASC'],
                            ],
                        }).then(response => {
                            if (response.length) {
                                resolve(response[0]['distances'][0])
                            } else {
                                reject("service is not available in our database")
                            }
                        }).catch(error => {
                            console.log(error)
                            reject(error)
                        });

                    }
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

    getDistance(data) {

        return new Promise(async (resolve, reject) => {
            try {
                const distance = await PinDistance.getDistance(data.from_pincode, data.to_pincode);
                resolve(parseInt(distance.toFixed(2)))
            } catch (error) {
                console.log(error)
                reject(error);
            }
        });
    }

    getOrdersList(data) {
        return new Promise(async (resolve, reject) => {
            try {
                OrderTransaction.findAll({
                    where: {
                        user_id: data.user_id
                    }
                }).then(orderList => {
                    Users.findOne({
                        where: {
                            id: data.user_id
                        }, attributes: ['id', 'name', 'MobileNumber', 'Email'],
                    }).then(userData => {
                        resolve({ orderList, userData })

                    }).catch(err => {
                        reject(err);

                    })
                }).catch(err => {
                    reject(err);
                })
            } catch (error) {
                console.log(error)
                reject(error);
            }
        });
    }

    getState(data) {
        return new Promise(async (resolve, reject) => {
            try {
                //resolve(franchi.getStatesOfCountry(101))
                Frenchise.findAll({
                    attributes: ['State'],
                    group: ['State']
                }).then(response => {
                    resolve(response)
                })
            } catch (error) {
                console.log(error)
                reject(error);
            }
        });
    }

    getCity(data) {
        return new Promise(async (resolve, reject) => {
            try {
                //resolve(csc.getCitiesOfState(data.state_id))
                console.log(data.state_id)
                Frenchise.findAll({
                    attributes: ['District'],
                    group: ['District'],
                    where: {
                        State: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('State')), 'LIKE', '%' + data.state_id + '%')
                    }
                }).then(response => {
                    resolve(response)
                })
            } catch (error) {
                console.log(error)
                reject(error);
            }
        });
    }

    searchPin(data) {
        return new Promise(async (resolve, reject) => {
            try {
                //console.log("Entry ",data)

                const res = lookup(data.pin)
                if (res)
                    resolve(res)
                else
                    reject({ "message": "Pincode not found" })
                return
                pincode.seachByPin(data.pin, function (response) {
                    console.log("Res ", response)
                    if (response.length > 0) {
                        response.forEach(function (resData) {
                            resolve(resData)
                        });
                    } else {
                        reject({ "message": "Pincode not found" })
                    }

                });
            } catch (error) {
                console.log(error)
                reject(error);
            }
        });
    }

    CreateRole(data) {

        return new Promise(async (resolve, reject) => {
            try {
                console.log("  Request received")
                var reqRole = {
                    role_name: data.role_name,
                };
                console.log(reqRole)
                RoleMaster.create(reqRole).then(response => {

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

    CreateModule(data) {

        return new Promise(async (resolve, reject) => {
            try {
                console.log("  Request received")
                var reqModule = {
                    module_name: data.module_name,
                    update_module: data.update_module,
                    veiw_module: data.veiw_module,
                    delete_module: data.delete_module,
                    all: data.all,
                };
                console.log(reqModule)
                ModuleMaster.create(reqModule).then(response => {

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

    MappingRole(data) {

        return new Promise(async (resolve, reject) => {
            try {
                console.log("  Request received")
                var reqModule = {
                    role_id: data.role_id,
                    module_id: data.module_id,
                };
                console.log(reqModule)
                MappingRole.create(reqModule).then(response => {

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

    CreateRegion(data) {

        return new Promise(async (resolve, reject) => {
            try {
                var reqRegion = {
                    region_name: data.state.toUpperCase(),
                    region_name: data.region_name.toUpperCase(),
                    region_pincodes: data.region_pincodes,
                };
                Regional.create(reqRegion).then(response => {
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

    CreateArea(data) {

        return new Promise(async (resolve, reject) => {
            try {
                var reqArea = {
                    city_id: data.city_id,
                    area_name: data.area_name.toUpperCase(),
                    pincode: data.pincode,
                    product_service: data.product_service,
                    service_type: data.service_type,
                    service_days: data.service_days,
                    verified: data.verified,
                    remarks: data.remarks,

                };
                AreaCreation.create(reqArea).then(response => {
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

    CreateCity(data) {

        return new Promise(async (resolve, reject) => {
            try {
                var reqCity = {
                    city_name: data.city_name.toUpperCase(),
                    regional_id: data.regional_id,
                };
                console.log(reqCity)
                CityCreation.create(reqCity).then(response => {
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

    listcityDetails(data) {
        return new Promise((resolve, reject) => {
            try {
                let conditions = {}
                let condiction = {}
                if (data.city_name != undefined)
                    condiction.city_name = data.city_name
                if (data.BusinessName != undefined)
                    conditions.BusinessName = data.BusinessName
                if (data.ContactPersion != undefined)
                    conditions.ContactPersion = data.ContactPersion
                if (data.MobileNumber != undefined)
                    conditions.MobileNumber = data.MobileNumber

                CityCreation.findAll({
                    attributes: ['city_name', 'id', 'IsActive'],
                    where: condiction,
                    include: [{
                        model: Frenchise,
                        attributes: ['ContactPersion', 'MobileNumber', 'BusinessName', 'id'],
                        where: conditions,
                    }]
                }).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
            } catch (err) {
                reject(err)
            }
        })
    }

    ListCity(data) {
        console.log("Welcome to query")
        return new Promise(async (resolve, reject) => {
            try {
                CityCreation.findAll({
                    required: true,
                    where: {
                        city_name: {
                            [Op.like]: "%" + data.city_name + "%",
                        },
                        IsActive: true
                    }, attributes: ['id', 'city_name', 'regional_id'],
                    include: [{
                        model: Frenchise,
                        attributes: ['id', 'ContactPersion', 'MobileNumber'],
                        where: {
                            city_id: {
                                [Op.ne]: null
                            },
                            Hub_id: data.Hub_id,
                            ApprovedStatus: 1
                        }
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
    ListallCity(data) {
        console.log("Welcome to query")
        return new Promise(async (resolve, reject) => {
            try {
                CityCreation.findAll({
                    required: true,
                    where: {
                        city_name: {
                            [Op.like]: "%" + data.city_name + "%",
                        },
                        IsActive: true
                    }, attributes: ['id', 'city_name', 'regional_id'],
                    include: [{
                        model: Frenchise,
                        attributes: ['id', 'ContactPersion', 'MobileNumber'],
                        where: {
                            city_id: {
                                [Op.ne]: null
                            },
                            ApprovedStatus: 1
                        }
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

    ListCityMaster(data) {
        console.log("Welcome to query")
        return new Promise(async (resolve, reject) => {
            try {
                CityCreation.findAll({
                    required: true,
                    where: {
                        city_name: {
                            [Op.like]: "%" + data.city_name + "%",
                        },
                        IsActive: true
                    }, attributes: ['id', 'city_name', 'regional_id'],
                    include: [{
                        model: Frenchise,
                        attributes: ['id', 'ContactPersion', 'MobileNumber'],
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

    CityAssignFranchise(data) {
        console.log("Welcome to query")
        return new Promise(async (resolve, reject) => {
            try {

                Frenchise.findAll({
                    attributes: ['id', 'city_id'],
                    where: {
                        city_id: {
                            [Op.ne]: null
                        }
                    }
                }).then(res => {
                    let CityIn = []
                    res.map(mapRes => {
                        CityIn.push(mapRes.city_id)
                    })
                    console.log(CityIn)
                    CityCreation.findAll({
                        where: {
                            city_name: {
                                [Op.like]: "%" + data.city_name + "%",
                            },
                            IsActive: true,
                            id: {
                                [Op.notIn]: CityIn
                            }
                        }, attributes: ['id', 'city_name', 'regional_id'],

                    }).then(response => {
                        resolve(response)
                    }).catch(error => {
                        console.log(error)
                        reject(error)
                    });
                })

                return


            } catch (error) {
                console.log(error)
                reject(error);
            }
        });
    }

    ListArea(data) {

        return new Promise(async (resolve, reject) => {
            try {
                AreaCreation.findAll({
                    where: {
                        city_id: data.city_id,
                        IsActive: true
                    }, attributes: ['id', 'city_id', 'area_name', 'pincode_id', 'product_service', 'service_type', 'service_days', 'verified', 'remarks'],
                    include: [{
                        model: CityCreation,
                        attributes: ['Id', 'city_name']
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

    GetAllRegion(data) {

        return new Promise(async (resolve, reject) => {
            try {
                Regional.findAll({
                    where: {
                        IsActive: true
                    }, attributes: ['id', 'region_name'],
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

    GetRegionId(data) {

        return new Promise(async (resolve, reject) => {
            try {
                Regional.findAll({
                    where: {
                        region_pincodes: {
                            [Op.like]: "%" + data.pincode_start + "%",
                        },
                        IsActive: true
                    }, attributes: ['id', 'region_name'],
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

    GetCityRegionBased(data) {

        return new Promise(async (resolve, reject) => {
            try {
                CityCreation.findAll({
                    where: {
                        regional_id: data.regional_id,
                        IsActive: true
                    }, attributes: ['id', 'city_name'],
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

    SaveAddress(data) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("  Request received")

                if (data.mobile) {
                    // mobile verification condiction
                    var reqAddress = {
                        "user_id": data.user_id,
                        "name": data.name,
                        "mobile": data.mobile,
                        "address": data.address,
                        "state": data.state,
                        "distict": data.distict,
                        "pinCode": data.pinCode
                    };
                    console.log(reqAddress)
                    Address.create(reqAddress).then(response => {

                        resolve(response)
                    }).catch(error => {
                        console.log(error)
                        reject(error)
                    });
                } else {
                    reject("mobile is required")
                }
            } catch (error) {
                console.log(error)
                reject(error);
            }
        });
    }

    GetAddress(data) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("  Request received")

                Address.findAll({ where: { user_id: data.user_id } }).then(response => {

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
    editAddress(data) {
        return new Promise((resolve, reject) => {
            try {
                Address.update({
                    name: data.name,
                    mobile: data.mobile,
                    address: data.address,
                    state: data.state,
                    distict: data.distict,
                    pinCode: data.pinCode,
                }, {
                    where: { user_id: data.user_id }
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            } catch (err) {
                reject(err)
            }
        })
    }

    AddWallet(data) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("Request received")

                // payment gateway integration 
                MoxdWallet.findOne({ where: { user_id: data.user_id } }).then(result => {
                    if (result) {
                        let amount = parseInt(result.amount) + parseInt(data.amount)
                        MoxdWallet.update({ amount: amount }, { where: { user_id: data.user_id } }).then(response => {
                            resolve(response)
                        }).catch(error => {
                            console.log(error)
                            reject(error)
                        });

                    } else {
                        let reqAdd = {
                            user_id: data.user_id,
                            amount: data.amount,
                            active: true
                        }
                        MoxdWallet.create(reqAdd).then(response => {

                            resolve(response)
                        }).catch(error => {
                            console.log(error)
                            reject(error)
                        });
                    }
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

    GetBalance(data) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("  Request received")


                MoxdWallet.findAll({ where: { user_id: data.user_id } }).then(response => {

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

    UserRegister(data) {
        return new Promise(async (resolve, reject) => {
            try {
                Users.findOne({
                    where: {
                        [Op.or]: [{ MobileNumber: data.MobileNumber }, { Email: data.Email }]
                    }
                }).then(result => {
                    if (result) {
                        reject("already registered")
                    } else {
                        let userRegister = {
                            Name: data.Name,
                            MobileNumber: data.MobileNumber,
                            Email: data.Email,
                            Password: md5(data.Password)
                        };
                        Users.create(userRegister).then(response => {
                            resolve("registered successfully")
                        }).catch(error => {
                            console.log(error)
                            reject(error)
                        });
                    }
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


    updateDeliveryimage(data) {
        return new Promise((resolve, reject) => {
            let deliver_boy_id = data.body.id
            let deliver_img_url = data.file.path
            var base = data.protocol + "://" + data.headers.host + "/" + deliver_img_url
            ASSING_DELIVERY_BOY.update(
                { receipt_img_url: base },
                { where: { id: deliver_boy_id } }
            ).then(result =>
                resolve(result)
            ).catch(err =>
                reject(err)
            )
        })
    }
    updatedrsimage(data) {
        return new Promise((resolve, reject) => {
            let drs_no = data.body.drs_no
            let drs_image = data.file.path
            var base = data.protocol + "://" + data.headers.host + "/" + drs_image

            DRS_DATA.update(
                { drs_image: base },
                { where: { drs_no: drs_no } }
            ).then(result =>
                resolve(result)
            ).catch(err =>
                reject(err)
            )
        })
    }

    UserLogin(data) {
        return new Promise(async (resolve, reject) => {
            try {
                Users.findOne({
                    where: {
                        Email: data.Email
                    },
                    // attributes:['id','Name','MobileNumber','Email']
                }).then(result => {
                    if (result) {
                        if (result.Password == md5(data.Password)) {
                            resolve({
                                message: "login successfully",
                                id: result.id,
                                Name: result.Name,
                                MobileNumber: result.MobileNumber,
                                Email: data.Email,
                            })
                        } else {
                            reject("wrong password")
                        }
                        // Users.create(userRegister).then(response => {
                        //     resolve("registered successfully")
                        // }).catch(error => {
                        //     console.log(error)
                        //     reject(error)
                        // });
                    } else {
                        reject("email not registered")
                    }
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
    updateCityId(data) {
        return new Promise((resolve, reject) => {
            try {
                Frenchise.update(
                    {
                        city_id: data.city_id
                    }, {
                    where: {
                        id: data.frenchise_id
                    }
                }).then(response => {
                    resolve(response)
                }).catch(err => {
                    console.log(err);
                    reject(err)
                }
                )
            } catch (err) {
                reject(err)
                console.log(error);
            }
        })
    }

    // updatedrsimage(data){
    //     return new Promise((resolve,reject)=>{
    //         try{
    //             DRS_DATA.update({
    //                 drs_image:data.image
    //             },{
    //                 where:{
    //                     drs_no:data.drs_no
    //                 }
    //             }).then(response=>{
    //                 resolve(response)
    //             }).catch(err=>{
    //                 reject(err)
    //             })
    //         }catch(err){
    //             reject(err)
    //         }
    //     })
    // }
    deleteCityMaster(data) {
        return new Promise((resolve, reject) => {
            try {
                CityCreation.destroy({
                    where: { id: data.id }
                }).then(respo => {
                    resolve(respo)
                }).catch(err => {
                    reject(err)
                })
            } catch (Err) {
                reject(Err)
            }
        })
    }
    listCityss(data) {
        return new Promise((resolve, reject) => {
            try {
                let conditions = {}
                let condiction = {}
                let required
                if (data.city_name != undefined) {
                    condiction.city_name = { [Op.like]: "%" + data.city_name + "%" }
                }
                if (data.isNull != false) {
                } else {
                    condiction.IsActive = true
                }
                if (data.BusinessName != undefined)
                    conditions.BusinessName = data.BusinessName
                if (data.ContactPersion != undefined)
                    conditions.ContactPersion = data.ContactPersion
                if (data.MobileNumber != undefined)
                    conditions.MobileNumber = data.MobileNumber

                if (data.isNull != true) {
                    conditions.city_id = { [Op.ne]: null }
                    required = true
                } else
                    required = false
                if (data.Hub_id != undefined) {
                    conditions.Hub_id = data.Hub_id
                }
                if (data.Hub_id != undefined && data.isNull == false)
                    conditions = { [Op.or]: [{ Hub_id: data.Hub_id }, { id: data.Hub_id }] }

                if (data.ApprovedStatus != undefined) {
                    conditions.ApprovedStatus = data.ApprovedStatus
                }
                CityCreation.findAll({
                    required: true,
                    where: condiction,
                    attributes: ['id', 'city_name', 'regional_id', 'isActive'],
                    include: [{
                        model: Frenchise,
                        required,
                        where: conditions,
                        attributes: ['id', 'ContactPersion', 'MobileNumber'],
                    }],
                }).then(response => {
                    resolve(response)
                }).catch(err => {
                    console.log(err);
                    reject(err)
                })
            } catch (err) {
                reject(err)
            }
        })
    }
    approveCity(data) {
        return new Promise((resolve, reject) => {
            try {
                Frenchise.update({
                    ApprovedStatus: 1,
                }, {
                    where: { city_id: data.city_id }
                }).then(respo => {
                    resolve(respo)
                }).catch(err => {
                    reject(err)
                })
            } catch (err) {
                reject(err)
            }
        })
    }
    updateCitymasterStatus(data) {
        return new Promise((resolve, reject) => {
            try {
                CityCreation.update({
                    IsActive: data.status
                }, {
                    where: { id: data.city_id }
                }).then(respo => {
                    resolve(respo)
                }).catch(err => {
                    console.log(err);
                    reject(err)
                })
            } catch (err) {
                console.log(err);
                reject(err)
            }
        })
    }
    updatepodimage(data) {
        return new Promise((resolve, reject) => {
            try {
                ASSING_DELIVERY_BOY.update({
                    pod_image: data.pod_image
                }, {
                    where: {
                        id: data.id
                    }
                }).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
            } catch (err) {
                reject(err)
            }
        })
    }
    profileDetails(data) {
        return new Promise((resolve, reject) => {
            try {
                Users.findOne({
                    where: { id: data.user_id },
                    attributes: ['Name', 'MobileNumber', 'Email', 'profile_image']
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            } catch (err) {
                reject(err)
            }
        })
    }
    get_formsubmission(data) {
        return new Promise((resolve, reject) => {
            try {
                let user = {
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    mobile_number: data.mobile_number,
                }
                welcomeEmail(user).then(respo => {
                    resolve(respo)
                }).catch(err => {
                    reject(err)
                })
            } catch (err) {
                reject(err)
            }
        })
    }
    updateimg(data, filename) {
        return new Promise((resolve, reject) => {
            try {
                var base = data.protocol + "://" + data.headers.host + "/assets/" + filename
                console.log(base);
                DELIVERY_BOY_MASTER.update({
                    picture: base
                }, {
                    where: { id: data.body.id }
                }).then(res => {
                    resolve(res)
                }).catch(erer => {
                    reject(erer)
                })
            } catch (err) {
                reject(err)
            }
        })
    }


    updatepanimg(data, filename) {
        return new Promise((resolve, reject) => {
            try {
                var base = data.protocol + "://" + data.headers.host + "/assets/" + filename
                console.log(base);
                DELIVERY_BOY_MASTER.update({
                    PanImage: base
                }, {
                    where: { id: data.body.id }
                }).then(res => {
                    resolve(res)
                }).catch(erer => {
                    reject(erer)
                })
            } catch (err) {
                reject(err)
            }
        })
    }
    profile_update(data) {
        return new Promise((resolve, reject) => {
            try {
                if (data.file != undefined) {
                    let profile_image = data.file.path
                    var base = data.protocol + "://" + data.headers.host + "/" + profile_image
                    var user = {
                        profile_image: base,
                        Name: data.body.Name,
                        MobileNumber: data.body.mobileNumber,
                        Email: data.body.Email
                    }
                    Users.update(user,
                        { where: { id: data.body.id } }
                    ).then(result =>
                        resolve(result)
                    ).catch(err =>
                        reject(err)
                    )
                } else {
                    Users.update({
                        Name: data.body.Name,
                        MobileNumber: data.body.mobileNumber,
                        Email: data.body.Email
                    }, {
                        where: { id: data.body.id }
                    }).then(res => {
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    })
                }
            } catch (err) {
                console.log(err);
                reject(err)
            }
        })
    }



    updatelicenseimg(data, filename) {
        return new Promise((resolve, reject) => {
            try {
                var base = data.protocol + "://" + data.headers.host + "/assets/" + filename
                console.log(base);
                DELIVERY_BOY_MASTER.update({
                    LicenseImage: base
                }, {
                    where: { id: data.body.id }
                }).then(res => {
                    resolve(res)
                }).catch(erer => {
                    reject(erer)
                })
            } catch (err) {
                reject(err)
            }
        })
    }



    update_adhar_front_img(data, filename) {
        return new Promise((resolve, reject) => {
            try {
                var base = data.protocol + "://" + data.headers.host + "/assets/" + filename
                console.log(base);
                DELIVERY_BOY_MASTER.update({
                    AadharImageFront: base
                }, {
                    where: { id: data.body.id }
                }).then(res => {
                    resolve(res)
                }).catch(erer => {
                    reject(erer)
                })
            } catch (err) {
                reject(err)
            }
        })
    }



    update_adhar_back_img(data, filename) {
        return new Promise((resolve, reject) => {
            try {
                var base = data.protocol + "://" + data.headers.host + "/assets/" + filename
                console.log(base);
                DELIVERY_BOY_MASTER.update({
                    AadharImageBack: base
                }, {
                    where: { id: data.body.id }
                }).then(res => {
                    resolve(res)
                }).catch(erer => {
                    reject(erer)
                })
            } catch (err) {
                reject(err)
            }
        })
    }



    after_delivery_img(data, filename) {
        return new Promise((resolve, reject) => {
            try {
                var base = data.protocol + "://" + data.headers.host + "/assets/" + filename
                console.log(base);
                ASSING_DELIVERY_BOY.update({
                    pod_image: base
                }, {
                    where: { delivery_boy_id: data.body.id }
                }).then(res => {
                    resolve(res)
                }).catch(erer => {
                    reject(erer)
                })
            } catch (err) {
                reject(err)
            }
        })
    }




    fcm_token(req, res) {
        return new Promise(async (resolve, reject) => {
            try {            
                var FCM = require('fcm-node');
                var serverKey = req.headers.serverkey;
                //console.log("the server key is", serverKey)
                var fcm = new FCM(serverKey);
                var message = {
                    to: req.body.device_token,
                    notification: {
                        title: 'Moxd',
                        body: 'push notifications',
                    },

                    data: { //you can send only notification or only data(or include both)
                        title: 'ok cdfsdsdfsd',
                        body: '{"name" : "okg ooggle ogrlrl"}'
                    }
                };
                fcm.send(message, function (err, res) {
                    if (err) {
                        reject(err)
                        console.log("Something has gone wrong!" + err);
                        console.log("Respponse:! " + res);
                    } else {
                        // showToast("Successfully sent with response");
                        resolve(res)
                        console.log("Successfully sent with response: ", res);
                    }
                });

            } catch (error) {
                console.log(error);
                reject(error)
            }
        })
    }
    deleteDistance(data){
        return new Promise((resolve,reject)=>{
            try{
                Distances.destroy({
                    where:{id:data.id}
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
    









}
module.exports = new QueryHandler();