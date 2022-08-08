const routeHandler = require('./handlers/route-handler');
const routeBookinHandler = require('./handlers/booking/route-handler');
const routeHandlerg =require('./handlers/admin/route-handler');
const queryHandler = require('./handlers/query-handler');
const queryhandler = require('./handlers/mobile/query-handler');
const routehandlers = require('./handlers/mobile/route-handler');
const auth = require('./handlers/auth');
const multer = require('multer');
const express = require('express');
const app = express();
const bodyParser = require("body-parser")


class Routes {
  constructor(app) {
    this.app = app;
  }


  /* creating app Routes starts */
  appRoutes() {
    // this.app.post('/register', routeHandler.registerRouteHandler);
    // this.app.post('/api/User/login', routeHandler.loginRouteHandler);
    this.app.post('/api/User/auth', routeHandler.auth);
    this.app.post('/api/User/frenchise_register', routeHandler.registerRouteHandler);
    this.app.post('/api/User/frenchise_login', routeHandler.loginFrenchiseRouteHandler);

    this.app.post('/api/User/approve_franchise', routeHandler.ApproveFranchise);
    this.app.post('/api/User/update_bank', routeHandler.UpdateBank);
    this.app.post('/api/User/update_document', routeHandler.UpdateDocument);
    this.app.post('/api/User/create_rate_master', routeHandler.CreateRateMaster);
    this.app.post('/api/User/get_rate', routeHandler.GetRate);
    this.app.post('/api/User/get_distance', routeHandler.getDistance);
    this.app.post('/api/User/get_orders_list', routeHandler.getOrdersList);
    this.app.get('/api/User/get_state', routeHandler.getState);
    this.app.post('/api/User/get_city', routeHandler.getCity);
    this.app.post('/api/User/search_pin', routeHandler.searchPin);

    this.app.post('/api/admin/near_franchise', routeHandler.NearByFranchise);
    this.app.post('/api/admin/add_weight', routeHandler.AddWeight);
    this.app.get('/api/admin/weight_list', routeHandler.GetWeight);
    this.app.post('/api/admin/add_distance', routeHandler.AddDistance);
    this.app.post('/api/admin/edit_distance', routeHandler.editDistance);
    this.app.post('/api/admin/deleteDistance', routeHandler.deleteDistance);
    this.app.post('/api/admin/distance_byid', routeHandler.GetDistanceById);
    this.app.post('/api/admin/rate_list', routeHandler.GetRateList);
    this.app.post('/api/admin/delete_weight', routeHandler.AddWeight);
    this.app.post('/api/admin/delete_weight', routeHandler.AddWeight);

    
    this.app.post('/api/User/create_region', routeHandler.CreateRegion);
    this.app.post('/api/User/create_area', routeHandler.CreateArea);
    this.app.post('/api/User/create_city', routeHandler.CreateCity);
    
    this.app.post('/api/User/list_city', routeHandler.ListCity);
    this.app.post('/api/User/list_all_city', routeHandler.ListallCity);
    this.app.post('/api/User/list_city_master', routeHandler.ListCityMaster);
    this.app.post('/api/User/listcityDetails', routeHandler.listcityDetails);
    this.app.post('/api/User/listCity', routeHandler.listCityss);
    this.app.post('/api/User/approve_city', routeHandler.approveCity);
    this.app.post('/api/User/updateCitymasterStatus', routeHandler.updateCitymasterStatus);

    this.app.post('/api/User/updatecityId', routeHandler.updateCityId);
    this.app.post('/api/User/city_assign_franchises', routeHandler.CityAssignFranchise);
    

    this.app.post('/api/User/list_area', routeHandler.ListArea);
    this.app.post('/api/User/get_region_id', routeHandler.GetRegionId);
    this.app.post('/api/User/get_region_all', routeHandler.GetAllRegion);
    this.app.post('/api/User/get_city_regionbased', routeHandler.GetCityRegionBased);
    this.app.post('/api/booking/FileUpload', routeHandler.FileUpload);
    this.app.post('/api/User/save_address', routeHandler.SaveAddress);
    this.app.post('/api/User/get_address', routeHandler.GetAddress);
    this.app.post('/api/User/edit_address', routeHandler.editAddress);
    this.app.post('/api/User/add_wallet', routeHandler.AddWallet);
    this.app.post('/api/admin/reachargewallet',routeHandlerg.reachargeWallet);
    this.app.post('/api/admin/createcomplaint',routeHandlerg.createComplaint);
    this.app.post('/api/admin/complaintlist',routeHandlerg.complaintList);  
    this.app.post('/api/admin/couponcreate',routeHandlerg.couponCreation);
    this.app.post('/api/admin/couponlist',routeHandlerg.couponDetails);
    this.app.post('/api/admin/couponlistss',routeHandlerg.couponList);
    this.app.post('/api/admin/delete_coupon',routeHandlerg.deleteCoupon);
    this.app.post('/api/User/updatedrsimage',routeHandler.updatedrsimage);
    this.app.post('/api/User/updatepodimage',routeHandler.updatepodimage);


    this.app.post('/api/User/get_balance', routeHandler.GetBalance);
    this.app.post('/api/User/register', routeHandler.UserRegister);
    this.app.post('/api/User/login', routeHandler.UserLogin);
    this.app.post('/api/User/profile_details', routeHandler.profileDetails);


    /**ADMIN */

    this.app.post('/api/admin/Createdeliveryboy', routeHandlerg.Createdeliveryboy);
    this.app.post('/api/admin/delivery_boy_list',routeHandlerg.ListOfDeliveryBoy);
    this.app.post('/api/admin/CreateAssign',routeHandlerg.CreateAssign);
    this.app.post('/api/admin/deliverystatus',routeBookinHandler.deliveryStatusUpdate);
    this.app.post('/api/admin/delivery_cnote_list',routeHandlerg.deliveryCNoteList);
    this.app.post('/api/admin/courier_delivery_list',routeHandlerg.CourierDeliveryList);
    this.app.post('/api/admin/frenchise_rate_master',routeHandlerg.FrenchiseRateMaster);
    this.app.post('/api/admin/frenchise_rate_master_list',routeHandlerg.FrenchiseRateMasterList);




/**Mobile **/


this.app.post('/api/mobile/signup' , routehandlers.Signup);
this.app.post('/api/mobile/login/mobileNumber' , routehandlers.Login);
this.app.post('/api/mobile/resend_otp' , routehandlers.resendotp);
this.app.post('/api/mobile/verify_mobile_otp' , routehandlers.VerifyMobileOTP);
this.app.post('/api/mobile/delivery_confirmation_otp' , routehandlers.delivery_confirmation_otp);
this.app.post('/api/mobile/Verify_delivery_confirmation_otp' , routehandlers.Verify_delivery_confirmation_otp);
this.app.post('/api/mobile/personal_detailes' , routehandlers.personaldetailes);
this.app.post('/api/mobile/list_personal_detailes' , routehandlers.Listpersonaldetails);
this.app.post('/api/mobile/vehicle_detailes' , routehandlers.vehicledetailes);
this.app.post('/api/mobile/list_vehicle_detailes' , routehandlers.Listvehicledetails);
this.app.post('/api/mobile/bankdetailes' , routehandlers.CreateBank);
this.app.post('/api/mobile/bankdetailes_list' , routehandlers.Listbankdetails);
this.app.post('/api/mobile/document' , routehandlers.CreateDocument);
this.app.post('/api/mobile/document_list' , routehandlers.Listdocuments);
this.app.post('/api/mobile/list_order' , routehandlers.listorder);
this.app.post('/api/mobile/getOrders_Lists' , routehandlers.getOrdersLists);
this.app.post('/api/mobile/Editpersonaldetails' , routehandlers.Editpersonaldetails);
this.app.post('/api/mobile/Editvehicledetailes' , routehandlers.Editvehicledetailes);
this.app.post('/api/mobile/Editbankdetails' , routehandlers.Editbankdetails);
this.app.post('/api/mobile/Editdocuments' , routehandlers.Editdocuments);
this.app.post('/api/mobile/offers' , routehandlers.offers);
this.app.post('/api/mobile/listoffers' , routehandlers.listoffers);
this.app.post('/api/mobile/order_confirmation_otp' , routehandlers.order_confirmation_otp);
this.app.post('/api/mobile/Verify_order_confirmation_otp' , routehandlers.Verify_order_confirmation_otp);
this.app.post('/api/mobile/order_drop_address' , routehandlers.order_drop_address);
this.app.post('/api/mobile/order_status' , routehandlers.order_status);
this.app.post('/api/mobile/getStatus' , routehandlers.getStatus);
this.app.get('/api/mobile/getotp' , routehandlers.getotp)







    /**
     * Booking
     */
    this.app.post('/api/booking/create_cnode', routeBookinHandler.CNote);
    this.app.post('/api/booking/cnote_list_frenchise', routeBookinHandler.CnoteListFrenchise);
    this.app.post('/api/booking/c_note_update', routeBookinHandler.CnoteStatusUpdate);
    this.app.post('/api/booking/normal_booking', routeBookinHandler.NormalBooking);
    this.app.post('/api/booking/payment_booking', routeBookinHandler.PaymentBooking);
    this.app.post('/api/booking/assign_c_node', routeBookinHandler.AssignCNode);
    this.app.post('/api/booking/assign_ogm', routeBookinHandler.AssignOgm);
    this.app.post('/api/booking/get_frenchise', routeBookinHandler.GetFrenchise);
    this.app.post('/api/booking/c_note_frenchise_list', routeBookinHandler.Cnote_FrenchiseList);
    this.app.post('/api/booking/all_booking', routeBookinHandler.AllBooking);
    this.app.post('/api/booking/all_booking_cnote', routeBookinHandler.AllBookingCNote);
    this.app.post('/api/admin/apply_coupon',routeHandlerg.applyCoupon);
    this.app.post('/api/booking/all_booking_filter', routeBookinHandler.AllBookingFilter);
    this.app.post('/api/booking/get_ogm', routeBookinHandler.GetOGM);


    this.app.post('/api/booking/c_note_list', routeBookinHandler.CNoteList);
    this.app.post('/api/booking/cnoteDetailList', routeBookinHandler.CnoteDetailList);

    this.app.post('/api/booking/outword', routeBookinHandler.OutWord);

    this.app.post('/api/booking/inwordList', routeBookinHandler.InWordist);

    this.app.post('/api/booking/OGMCNodeVerified', routeBookinHandler.InwordCNodeVerified);

    this.app.post('/api/booking/inwordSubmit', routeBookinHandler.InwordSubmit);
    this.app.post('/api/booking/inout_list', routeBookinHandler.InoutList);
    this.app.post('/api/booking/tracking_by_id', routeBookinHandler.TrackingById);

    this.app.post('/api/booking/billing_details', routeBookinHandler.BillingDetails);

    this.app.post('/api/booking/bulkAssginOGMOut', routeBookinHandler.bulkAssginOGMOut);
    this.app.post('/api/booking/bulkAssginOGMInward', routeBookinHandler.bulkAssginOGMInward);
    this.app.post('/api/booking/getOGMSourceNo', routeBookinHandler.getOGMSourceNo);
    this.app.post('/api/booking/walletamount', routeBookinHandler.walletAmount);
    this.app.post('/api/booking/wallethistory', routeBookinHandler.walletHistory);
  
    this.app.post('/api/booking/deliverboy_master', routeBookinHandler.deliveryBoyMaster);
    this.app.post('/api/booking/create_area_master', routeBookinHandler.createAreaMaster);   
    this.app.post('/api/booking/pincode_master', routeBookinHandler.pinCodeMaster); 
    this.app.post('/api/booking/list_areamaster', routeBookinHandler.listAreaMaster);
    this.app.post('/api/booking/listdeliverymaster',routeBookinHandler.listdeliveryMaster)
    this.app.post('/api/booking/listpincodemaster',routeBookinHandler.listpincodeMaster);
    
    this.app.post('/api/booking/deletefrenchiserate_masters',routeBookinHandler.deleteFrenchiseRateMaster);
    this.app.post('/api/booking/deletedeliverymaster',routeBookinHandler.deleteDeliveryboyMaster);
    this.app.post('/api/booking/deleteareamaster',routeBookinHandler.deleteAreaMaster);
    this.app.post('/api/booking/deletepincodemaster',routeBookinHandler.deletePincodeMaster);
    this.app.post('/api/booking/deletecity_master',routeBookinHandler.deleteCityMaster);
    this.app.post('/api/booking/editareamaster',routeBookinHandler.editAreaMaster);
    this.app.post('/api/booking/editpincodemaster',routeBookinHandler.editPincodeMaster);
    this.app.post('/api/booking/editdeliverymaster',routeBookinHandler.editDeliveryMaster);
    this.app.post('/api/booking/edit_city_master',routeBookinHandler.editCitymaster);
    this.app.post('/api/booking/editfrenchise_rate_master',routeBookinHandler.editFrenchiseRateMaster);
  //  this.app.get('/api/booking/bookinglist',routeBookinHandler.listbooking);


    this.app.post('/api/booking/inwordListsss', routeBookinHandler.InWordList);
    this.app.post('/api/booking/createbooking', routeBookinHandler.CreateBookings);
    this.app.post('/api/booking/edit_booking', routeBookinHandler.editBooking);
    this.app.post('/api/booking/booking_list_bycnode', routeBookinHandler.updateCnode);
    this.app.post('/api/booking/bookinglist_byfrenchiese_id',routeBookinHandler.listbooking)
    this.app.post('/api/booking/bookinglist_by_userId',routeBookinHandler.listbookingUserId)
    this.app.post('/api/booking/count',routeBookinHandler.count)
    this.app.post('/api/booking/total_count',routeBookinHandler.total_count)
    this.app.post('/api/booking/order_dispatching',routeBookinHandler.orderDispatching)
    this.app.post('/api/booking/list_transaction',routeBookinHandler.list_transaction)


    /** 
     * Role Management 
     */
    this.app.post('/api/User/create_role', routeHandler.CreateRole);
    this.app.post('/api/User/create_module', routeHandler.CreateModule);
    this.app.post('/api/User/role_mapping', routeHandler.MappingRole);

    this.app.post('/api/User/GetUser', auth.verify, routeHandler.getUserListRouteHandler);

    this.app.get('/api/AutoTrans/User/UserRoleList', auth.verify, routeHandler.getRoleRouteHandler);
    this.app.get('/api/AutoTrans/User/UserModuleList', auth.verify, routeHandler.getModuleRouteHandler);
    this.app.post('/api/AutoTrans/User/GetUserList', auth.verify, routeHandler.getUserRouteHandler);
    //this.app.post('/api/AutoTrans/User/DeleteUser', routeHandler.deleteUserRouteHandler);

    this.app.post('/api/User/NewPassword', routeHandler.NewPassword);
    this.app.post('/api/AutoTrans/User/SendOTP', routeHandler.SendOTP);
    this.app.post('/api/AutoTrans/User/VerifyOTP', routeHandler.VerifyOTP);
    this.app.post('/api/AutoTrans/User/ChangePassword', auth.verify, routeHandler.ChangePassword);
    this.app.get('/tokenverify', auth.verify, routeHandler.tokenVerify);     
    //this.app.get('/user/:userId', routeHandler.getUserDetailsHandler);
    this.app.post('/api/get_in_form_submission',routeHandler.get_formsubmission);    
    const express = require('express')
    this.app.use('/assets', express.static('assets'))  
    this.app.get('*', routeHandler.routeNotFoundHandler);









//mobile image_upload//


    const fs = require('fs');
    this.app.use(bodyParser.json({limit: '5000mb'}));
    this.app.use(bodyParser.urlencoded({limit: "5000mb", extended: true, parameterLimit:10000000000}));

    const mime = require('mime-types')
    mime.extension('text/plain') //txt
    mime.extension('image/png') //png


    
    this.app.post('/upload/image', routeHandler.uploadImage)
    this.app.post('/upload/pan_image', routeHandler.uploadpan_Image)
    this.app.post('/upload/license_image', routeHandler.uploadlicense_Image)
    this.app.post('/upload/adhar_front_image', routeHandler.uploadadhar_front_Image)
    this.app.post('/upload/adhar_back_image', routeHandler.uploadadhar_back_Image)
    this.app.post('/upload/upload_delivery_Image', routeHandler.upload_delivery_Image)

    this.app.post('/api/fcm_token', routeHandler.fcm_token)

















//file upload

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'assets');
  },
  filename: function (req, file, cb) {
  cb(null, Date.now() + '-' + file.originalname);
  }
  });
  var upload = multer({ storage: storage });
  
  
  this.app.post('/api/image-upload', upload.single('image'),(req, res) => {
    queryHandler.updateDeliveryimage(req)     
    const path = req.file.path
    var base =req.protocol+"://"+req.headers.host+"/"+path
    res.send(({message: 'File uploaded successfully.', base,error:false}));  
  });
  this.app.post('/api/updatedrsimage', upload.single('image'),(req, res) => {
    queryHandler.updatedrsimage(req) 
    
    const path = req.file.path    
    var base =req.protocol+"://"+req.headers.host+"/"+path
    res.send(({message: 'File uploaded successfully.', base,error:false}));  
  });


  this.app.post('/api/profile_update',upload.single('image'),(req, res)=>{
    routeHandler.profile_update(req,res)
  })  

  this.app.post('/api/profile_image', upload.single('image'),(req, res) => {
    queryhandler.updateProfileImage(req) 
    
    const path = req.file.path    
    var base =req.protocol+"://"+req.headers.host+"/"+path
    res.send(({message: 'File uploaded successfully.', base,error:false}));

  });
  this.app.post('/api/License_image', upload.single('image'),(req, res) => {
    queryhandler.updateLicenseImage(req) 

    
    const path = req.file.path
    var base =req.protocol+"://"+req.headers.host+"/"+path
    res.send(({message: 'File uploaded successfully.', base,error:false}));
  });

  this.app.post('/api/pan_image', upload.single('image'),(req, res) => {
    queryhandler.updatePanimage(req) 

    
    const path = req.file.path
    var base =req.protocol+"://"+req.headers.host+"/"+path
    res.send(({message: 'File uploaded successfully.', base,error:false}));

  });
  
  this.app.post('/api/adhar_back_image', upload.single('image'),(req, res) => {
    queryhandler.updateAadharImageBack(req) 
    const path = req.file.path
    var base =req.protocol+"://"+req.headers.host+"/"+path
    res.send(({message: 'File uploaded successfully.', base,error:false}));

  });

  this.app.post('/api/adhar_front_image', upload.single('image'),(req, res) => {
    queryhandler.updateAadharImageFront(req) 

    
    const path = req.file.path
    var base =req.protocol+"://"+req.headers.host+"/"+path
    res.send(({message: 'File uploaded successfully.', base,error:false}));
  });
}


  routesConfig() {
    this.appRoutes();
  }
}
module.exports = Routes;
