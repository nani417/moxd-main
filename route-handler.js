const CONSTANTS = require('../../config/constants');
const helper = require('../admin/query-handler');
var logger = require('../../logger')('User');



class RouteHandler{
  /**
   * Get Region based on User given pincode
   * 
   * @param {*} request 
   * @param {*} response 
   */

async CreateAssign(request, response) {
    try {
      const result = await helper.CreateAssign(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_DOCUMENT_INFO_UPDATED,
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error
      });
    }

}

async deliveryCNoteList(request, response) {
  try {
    const result = await helper.deliveryCNoteList(request.body);
    if (result === null || result === undefined) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error.message,
      });
    } else {
      response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
        error: false,
        message: CONSTANTS.USER_SUCCESS,
        data:result
      });
    }
  } catch (error) {
    response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
      error: true,      
      message: error,
    });
  }

}

async CourierDeliveryList(request, response) {

  try {
    const result = await helper.CourierDeliveryList(request.body);
    if (result === null || result === undefined) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.USER_INFO_WRONG,
      });
    } else {
      response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
        error: false,
        message: CONSTANTS.USER_SUCCESS,
        data:result
      });
    }
  } catch (error) {
    response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
      error: true,
      message: error.message,
    });
  }

}


async Createdeliveryboy(request, response) {

    try {
      const result = await helper.Createdeliveryboy(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_DOCUMENT_INFO_UPDATED,
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error.message,
      });
    }

}

async ListOfDeliveryBoy(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;
    console.log("Welcome to create ")
    try {
      const result = await helper.ListOfDeliveryBoy(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
          data:result
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.CREATE_REAGION_SUCCESS,
          data:result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error.message,
      });
    }

  }

  async reachargeWallet(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;
    console.log("Welcome to create ")
    try {
      const result = await helper.reachargeWallet(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
          data:result
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.CREATE_REAGION_SUCCESS,
          data:result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,        
        message: error.message,
      });
    }
  }
  
  async createComplaint(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;
    console.log("Welcome to create ")
    try {
      const result = await helper.createComplaint(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
          data:result
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.CREATE_REAGION_SUCCESS,
          data:result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,        
        message: error.message,
      });
    }
  }
  async complaintList(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;
    console.log("Welcome to create ")
    try {
      const result = await helper.complaintList(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
          data:result
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.CREATE_REAGION_SUCCESS,
          data:result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,        
        message: error.message,
      });
    }
  }
  async couponCreation(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;
    console.log("Welcome to create ")
    try {
      const result = await helper.couponCreation(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
          data:result
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.CREATE_REAGION_SUCCESS,
          data:result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,        
        message: error.message,
      });
    }
  }
  
  async couponDetails(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;
    console.log("Welcome to create ")
    try {
      const result = await helper.couponDetails(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
          data:result
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.CREATE_REAGION_SUCCESS,
          data:result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,        
        message: error.message,
      });
    }
  }
  
  
  async FrenchiseRateMaster(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;
    console.log("Welcome to create ")
    try {
      const result = await helper.FrenchiseRateMaster(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
          data:result
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.CREATE_REAGION_SUCCESS,
          data:result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,        
        message: error,
      });
    }
  }
  async FrenchiseRateMasterList(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;
    console.log("Welcome to create ")
    try {
      const result = await helper.FrenchiseRateMasterList(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
          data:result
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.CREATE_REAGION_SUCCESS,
          data:result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,        
        message: error,
      });
    }
  }
  async deleteCoupon(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;
    console.log("Welcome to create ")
    try {
      const result = await helper.deleteCoupon(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
          data:result
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.CREATE_REAGION_SUCCESS,
          data:result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,        
        message: error,
      });
    }
  }
  async applyCoupon(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;
    console.log("Welcome to create ")
    try {
      const result = await helper.applyCoupon(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
          data:result
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.CREATE_REAGION_SUCCESS,
          data:result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,        
        message: error.message,
      });
    }
  }
  async couponList(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;
    console.log("Welcome to create ")
    try {
      const result = await helper.couponList(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
          data:result
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.CREATE_REAGION_SUCCESS,
          data:result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,        
        message: error.message,
      });
    }
  }
  
}


  module.exports = new RouteHandler();