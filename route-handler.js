const mime = require('mime-types')
mime.extension('text/plain') //txt
mime.extension('image/png') //png
/* eslint-disable class-methods-use-this */
const CONSTANTS = require('./../config/constants');
const helper = require('./../handlers/query-handler');
var logger = require('../logger')('User');
const pin = require('pincode');
const Joi = require("joi");
const { CostExplorer } = require('aws-sdk');
// const express = require('express');
// const app = express();
// const bodyParser = require("body-parser")
const fs = require('fs');

class RouteHandler {

  /**
   * Login authentication user using passport 
   * @param {*} request 
   * @param {*} response 
   * @param {*} next 
   */
  async loginRouteHandler(request, response, next) {
    const data = {
      Mobilenumber: request.body.Mobilenumber === '' || request.body.Mobilenumber === undefined ? null : (request.body.Mobilenumber).trim(),
      Password: request.body.Password === '' || request.body.Password === undefined ? null : request.body.Password.trim(),
    };
    if (data.Mobilenumber === '' || data.Mobilenumber === null) {
      response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.USERNAME_NOT_FOUND,
      });
    } else if (data.Password === '' || data.Password === null) {
      response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.PASSWORD_NOT_FOUND,
      });
    } else {
      try {
        const result = await helper.login(data, request, response, next);
        if (result === null || result === undefined) {
          response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.USER_LOGIN_FAILED,
          });
        } else {
          response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
            error: false,
            message: CONSTANTS.USER_SUCCESS,
            token: result[0],
            exp: '1h',
            userdata: result[1],
          });
        }
      } catch (error) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_LOGIN_FAILED,
        });
      }
    }
  }

  async auth(request, response) {

    try {

      const result = await helper.auth(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SECURE_TOKEN_INVALID_CODE).json({
          error: true,
          message: CONSTANTS.SECURE_TOKEN_INVALID,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          token: result,
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.USER_LOGIN_FAILED,
      });
    }

  }

  async tokenVerify(request, response) {
    const { payload: { Id, MobileNumber, Name } } = request;

    try {
      response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
        error: false,
        message: CONSTANTS.USER_LOGIN_OK,
      });
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.USER_LOGIN_FAILED,
      });
    }

  }

  async getUserListRouteHandler(request, response) {
    const { payload: { Id, MobileNumber, Name } } = request;

    try {
      const result = await helper.GetAllUserList();
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_LOGIN_FAILED,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.USER_LOGIN_FAILED,
      });
    }

  }

  async getRoleRouteHandler(request, response) {
    const { payload: { Id, MobileNumber, Name } } = request;

    try {
      const result = await helper.userRoleList();
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_LOGIN_FAILED,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result,
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.USER_LOGIN_FAILED,
      });
    }

  }

  async getModuleRouteHandler(request, response) {
    const { payload: { Id, MobileNumber, Name } } = request;
    try {
      const result = await helper.userModuleList();
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_LOGIN_FAILED,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result,
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.USER_LOGIN_FAILED,
      });
    }

  }

  async getUserRouteHandler(request, response) {
    const { payload: { Id, MobileNumber, Name } } = request;

    try {
      const result = await helper.GetUserList(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_LOGIN_FAILED,
        });
      } else {
        console.log(result);
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          count: result[0],
          data: result[1],
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.USER_LOGIN_FAILED,
      });
    }

  }

  /**
   * Register the user 
   * @param {*} request 
   * @param {*} response 
   */
  async registerRouteHandler(request, response) {
    try {

      /*pin.seachByArea('Chandni Chowk', function (response) {
        response.forEach(function (data) {
            console.log(data);
        });
      });
      console.log("-----------Area----------")
      pin.seachByArea('Keeladi', function (response) {
        response.forEach(function (data) {
            console.log(data);
        });
      });
    console.log("-----------District----------")
    pin.seachByDistrict('Sivaganga', function (response) {
      response.forEach(function (data) {
          console.log(data);
      });
    });

      return ;*/
      const result = await helper.register(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_LOGIN_FAILED,
        });
      } else {
        if (result[0] == 0) {
          response.status(CONSTANTS.DATA_ALREADY_EXISTS).json({
            error: true,
            message: CONSTANTS.USER_ALREADY_EXISTS,
          });
        } else if (result[0] == 1) {
          response.status(CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.SERVER_ERROR_MESSAGE,
          });
        } else {
          response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
            error: false,
            message: CONSTANTS.USER_SUCCESS,
          });
        }

      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error.message,
      });
    }

  }


  /**
   * Register the user 
   * @param {*} request 
   * @param {*} response 
   */
   async loginFrenchiseRouteHandler(request, response) {
    try {
      const result = await helper.FrenchiseLogin(request.body);

      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_LOGIN_FAILED,
        });
      } else {
        if (result) {
          response.status(CONSTANTS.DATA_ALREADY_EXISTS).json({
            error: false,
            message: "success",
            data:result
          });
        }  else {
          response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
            error: true,
            message: result,
          });
        }

      }
    } catch (error) {      
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error,
      });
    }

  }

  /**
   * Update the New Password 
   * @param {*} request 
   * @param {*} response 
   */
  async ApproveFranchise(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;
    try {
      const result = await helper.ApproveFranchise(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_FRANCHISE_APPROVED,
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error.message,
      });
    }

  }

  /**
  * Update the New Password 
  * @param {*} request 
  * @param {*} response 
  */
  async UpdateDocument(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;

    try {
      const result = await helper.UpdateDocument(request.body);
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

  /**
 * Update the New Password 
 * @param {*} request 
 * @param {*} response 
 */
  async UpdateBank(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;

    try {
      const result = await helper.UpdateBank(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_BANK_INFO_UPDATED,
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error.message,
      });
    }

  }


  /**
   * Update the New Password 
   * @param {*} request 
   * @param {*} response 
   */
  async NewPassword(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;

    try {
      const result = await helper.NewPassword(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_NEW_PASSWORD_CHANGED,
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.SERVER_ERROR_MESSAGE,
      });
    }

  }

  /**
   * Send the OTP to requested user 
   * @param {*} request 
   * @param {*} response 
   */
  async SendOTP(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;

    try {
      const result = await helper.SendOTP(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_NOT_FOUND,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.OTP_SUCCESSFULLY_SENT,
          otp:result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.SERVER_ERROR_MESSAGE,
      });
    }

  }

  async VerifyOTP(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;

    try {
      const result = await helper.VerifyOTP(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.OTP_NOT_VERIFIED,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.OTP_VERIFIED,
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.SERVER_ERROR_MESSAGE,
      });
    }

  }

  async ChangePassword(request, response) {
    const { payload: { Id, MobileNumber, Name } } = request;

    try {
      const result = await helper.ChangePassword(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          message: CONSTANTS.USER_INFO_WRONG,
          error: true,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
        });
      }
    } catch (error) {
      console.log(error)
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.SERVER_ERROR_MESSAGE,
      });
    }

  }

  routeNotFoundHandler(request, response) {
    response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
      error: true,
      message: CONSTANTS.ROUTE_NOT_FOUND,
    });
  }

  async ExportUserList(request, response) {
    const { payload: { Id, MobileNumber, Name } } = request;

    console.log("Welcome ::  ")
    try {
      const result = await helper.ExportUserList(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_LOGIN_FAILED,
        });
      } else {

        let filename = 'IndividaulBase.xlsx';
        let absPath = path.join(__dirname, '/assets/', filename);

        response.download(result, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Success")
          }
        });
        return
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.USER_LOGIN_FAILED,
      });
    }

  }

  /**
  * Update the New Password 
  * @param {*} request 
  * @param {*} response 
  */
  async CreateRateMaster(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;

    try {
      const result = await helper.CreateRateMaster(request.body);
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

  /**
   * Get Rate given mass and distance 
   * @param {*} request 
   * @param {*} response 
   */
  async GetRate(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;

    try {
      const result = await helper.GetRate(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error,
      });
    }

  }

   /**
   * Get Rate given mass and distance 
   * @param {*} request 
   * @param {*} response 
   */
    async AddWeight(request, response) {
      //const { payload: {Id, MobileNumber,Name } } = request;
  
      let validation = Joi.object().keys({
        weight_from: Joi.number().required(),
        weight_to: Joi.number().required(),
        name: Joi.string().required(),
        id:Joi.number(),
      });
      let result = validation.validate(request.body, { abortEarly: false });
      console.log("Welcome",result)
      if (result.error) {
          let data = result.error.details[0].message.replace(
              /[."*+\-?^${}()|[\]\\]/g,
              ""
          );
          response.send({ code: 400, err: data });
          return;
      }


      try {
        const result = await helper.AddWeight(request.body);
        console.log("check 1")
        if (result === null || result === undefined) {
          response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.USER_INFO_WRONG,
          });
          console.log("check 2")
        } else {
          response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
            error: false,
            message: CONSTANTS.USER_SUCCESS,
            data: result
          });
          console.log("check 3",result)
        }
      } catch (error) {
        console.log("check 3")
        console.log("error",error)
        // response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        //   error: true,
        //   message: error,
        // });
      }
  
    }

      /**
   * Get Rate given mass and distance 
   * @param {*} request 
   * @param {*} response 
   */
       async NearByFranchise(request, response) {
        //const { payload: {Id, MobileNumber,Name } } = request;
    
    
        let validation = Joi.object().keys({
          lat: Joi.number().required(),
          lng: Joi.number().required(),
          distance: Joi.number().required(),
        });
        let result = validation.validate(request.body, { abortEarly: false });
        console.log("Welcome",result)
        if (result.error) {
            let data = result.error.details[0].message.replace(
                /[."*+\-?^${}()|[\]\\]/g,
                ""
            );
            response.send({ code: 400, err: data });
            return;
        }
  
  
        try {
          const result = await helper.NearByFranchise(request.body);
          console.log("check 1")
          if (result === null || result === undefined) {
            response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
              error: true,
              message: CONSTANTS.USER_INFO_WRONG,
            });
            console.log("check 2")
          } else {
            response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
              error: false,
              message: CONSTANTS.USER_SUCCESS,
              data: result
            });
            console.log("check 3",result)
          }
        } catch (error) {
          console.log("check 3")
          console.log("error",error)
          // response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          //   error: true,
          //   message: error,
          // });
        }
    
      }

     /**
   * Get Rate given mass and distance 
   * @param {*} request 
   * @param {*} response 
   */
      async AddDistance(request, response) {
        //const { payload: {Id, MobileNumber,Name } } = request;
    
        try {
          const result = await helper.AddDistance(request.body);
          if (result === null || result === undefined) {
            response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
              error: true,
              message: CONSTANTS.USER_INFO_WRONG,
            });
          } else {
            response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
              error: false,
              message: CONSTANTS.USER_SUCCESS,
              data: result
            });
          }
        } catch (error) {
          response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
            error: true,
            message: error,
          });
        }
    
      }

      
       /**
   * Get Rate given mass and distance 
   * @param {*} request 
   * @param {*} response 
   */
    async GetRateList(request, response) {
      //const { payload: {Id, MobileNumber,Name } } = request;
  
      try {
        const result = await helper.GetRateList(request.body);
        if (result === null || result === undefined) {
          response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.USER_INFO_WRONG,
          });
        } else {
          response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
            error: false,
            message: CONSTANTS.USER_SUCCESS,
            data: result
          });
        }
      } catch (error) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: error,
        });
      }
  
    }


       /**
   * Get Rate given mass and distance 
   * @param {*} request 
   * @param {*} response 
   */
    async GetDistanceById(request, response) {
      //const { payload: {Id, MobileNumber,Name } } = request;
  
      try {
        const result = await helper.GetDistanceById(request.body);
        if (result === null || result === undefined) {
          response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.USER_INFO_WRONG,
          });
        } else {
          response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
            error: false,
            message: CONSTANTS.USER_SUCCESS,
            data: result
          });
        }
      } catch (error) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: error,
        });
      }
  
    }

     /**
   * Get Rate given mass and distance 
   * @param {*} request 
   * @param {*} response 
   */
      async GetWeight(request, response) {
        //const { payload: {Id, MobileNumber,Name } } = request;
    
        try {
          const result = await helper.GetWeight();
          if (result === null || result === undefined) {
            response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
              error: true,
              message: CONSTANTS.USER_INFO_WRONG,
            });
          } else {
            response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
              error: false,
              message: CONSTANTS.USER_SUCCESS,
              data: result
            });
          }
        } catch (error) {
          response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
            error: true,
            message: error,
          });
        }
    
      }
  
  /**
* Get distace from two pincodes
* @param {*} request 
* @param {*} response 
*/
  async getDistance(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;

    try {
      const result = await helper.getDistance(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          Distance: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error.message,
      });
    }

  }

async getOrdersList(request, response) {
  //const { payload: {Id, MobileNumber,Name } } = request;

  try {
    const result = await helper.getOrdersList(request.body);
    if (result === null || result === undefined) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.USER_INFO_WRONG,
      });
    } else {
      response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
        error: false,
        // message: CONSTANTS.USER_SUCCESS,
        list: result
      });
    }
  } catch (error) {
    response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
      error: true,
      message: error.message,
    });
  }

}

async getState(request, response) {
  //const { payload: {Id, MobileNumber,Name } } = request;

  try {
    const result = await helper.getState(request.body);
    if (result === null || result === undefined) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.USER_INFO_WRONG,
      });
    } else {
      response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
        error: false,
        // message: CONSTANTS.USER_SUCCESS,
        data: result
      });
    }
  } catch (error) {
    response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
      error: true,
      message: error.message,
    });
  }

}

async getCity(request, response) {
  //const { payload: {Id, MobileNumber,Name } } = request;

  try {
    const result = await helper.getCity(request.body);
    if (result === null || result === undefined) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.USER_INFO_WRONG,
      });
    } else {
      response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
        error: false,
        // message: CONSTANTS.USER_SUCCESS,
        data: result
      });
    }
  } catch (error) {
    response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
      error: true,
      message: error.message,
    });
  }

}


async searchPin(request, response) {
  //const { payload: {Id, MobileNumber,Name } } = request;

  try {
    const result = await helper.searchPin(request.body);
    if (result === null || result === undefined) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.USER_INFO_WRONG,
      });
    } else {
      response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
        error: false,
        // message: CONSTANTS.USER_SUCCESS,
        data: result
      });
    }
  } catch (error) {
    response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
      error: true,
      message: error.message,
    });
  }

}
  /**
* Update the New Password 
* @param {*} request 
* @param {*} response 
*/
  async CreateRole(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;

    try {
      const result = await helper.CreateRole(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.ROLE_CREATED,
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error.message,
      });
    }

  }

  /**
* Update the New Password 
* @param {*} request 
* @param {*} response 
*/
  async CreateModule(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;

    try {
      const result = await helper.CreateModule(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.MODULE_CREATED,
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error.message,
      });
    }

  }

  /**
* Update the New Password 
* @param {*} request 
* @param {*} response 
*/
  async MappingRole(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;

    try {
      const result = await helper.MappingRole(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.MODULE_CREATED,
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error.message,
      });
    }

  }

  /**
* Update the New Password 
* @param {*} request 
* @param {*} response 
*/
  async CreateRegion(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;

    try {
      const result = await helper.CreateRegion(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.CREATE_REAGION_SUCCESS,
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error.message,
      });
    }

  }

  /**
   * Area created based on Region
   * 
   * @param {*} request 
   * @param {*} response 
   */
  async CreateArea(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;

    try {
      const result = await helper.CreateArea(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.CREATE_REAGION_SUCCESS,
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error.message,
      });
    }

  }

  async CreateCity(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;

    try {
      const result = await helper.CreateCity(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.CREATE_REAGION_SUCCESS,
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error.message,
      });
    }

  }

  
  async ListCity(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;
    console.log("Welcome to create ")
    try {
      const result = await helper.ListCity(request.body);
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
  async ListallCity(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;
    console.log("Welcome to create ")
    try {
      const result = await helper.ListallCity(request.body);
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

  async ListCityMaster(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;
    console.log("Welcome to create ")
    try {
      const result = await helper.ListCityMaster(request.body);
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
  async CityAssignFranchise(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;
    console.log("Welcome to create ")
    try {
      const result = await helper.CityAssignFranchise(request.body);
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
  /**
   * Listout area based on city id
   * 
   * @param {*} request 
   * @param {*} response 
   */
  async ListArea(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;

    try {
      const result = await helper.ListArea(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error.message,
      });
    }

  }

  /**
 * Get Region based on User given pincode
 * 
 * @param {*} request 
 * @param {*} response 
 */
  async GetAllRegion(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;

    try {
      const result = await helper.GetAllRegion(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error.message,
      });
    }

  }

  /**
   * Get Region based on User given pincode
   * 
   * @param {*} request 
   * @param {*} response 
   */
  async GetRegionId(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;

    try {
      const result = await helper.GetRegionId(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error.message,
      });
    }

  }

  /**
 * Get All city based on Region
 * 
 * @param {*} request 
 * @param {*} response 
 */
  async GetCityRegionBased(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;

    try {
      const result = await helper.GetCityRegionBased(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error.message,
      });
    }

  }
  async SaveAddress(request, response) {
    console.log("Welcome Test")
    try {
      const result = await helper.SaveAddress(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error.message,
      });
    }

  }
  async GetAddress(request, response) {
    console.log("Welcome Test")
    try {
      const result = await helper.GetAddress(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error.message,
      });
    }

  }
  async AddWallet(request, response) {
    console.log("Welcome Test")
    try {
      const result = await helper.AddWallet(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error.message,
      });
    }

  }
  async GetBalance(request, response) {
    console.log("Welcome Test")
    try {
    const result = await helper.GetBalance(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error.message,
      });
    }

  }

  async UserRegister(request, response) {
    try {
      const result = await helper.UserRegister(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error,
      });
    }
  }
  async UserLogin(request, response) {
    try {
      const result = await helper.UserLogin(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error,
      });
    }
  }
  async updateCityId(request, response) {
    try {
      const result = await helper.updateCityId(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error,
      });
    }
  }
  async listcityDetails(request, response) {
    try {
      const result = await helper.listcityDetails(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error,
      });
    }
  }
  async updateCityId(request, response) {
    try {
      const result = await helper.updateCityId(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error,
      });
    }
  }
  FileUpload = function (req, res) {
    //console.log("-------------fileupload-----------");
    //console.log(req.body.itemAlias);

    var date = req.body.date;

    var selectType = req.body.select;
    var url = ""
    var message = ""
    if (req.files.length > 0) {

      var file = req.files[0];
      var ext = file.originalname.split(".");
      url = file.location
      console.log(url);
      message = "Success"
    } else {
      message = "Please Upload the File"
      url = ""
    }

    res.json({ code: 200, msg: message, data: url });


  };
  async updatedrsimage(request, response) {
    //const { payload: {Id, MobileNumber,Name } } = request;
    console.log("Welcome to create ")
    try {
      const result = await helper.updatedrsimage(request.body);
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
  async deleteCityMaster(request, response) {
    console.log("Welcome Test")
    try {
      const result = await helper.deleteCityMaster(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error,
      });
    }

  }
  async listCityss(request, response) {
    console.log("Welcome Test")
    try {
      const result = await helper.listCityss(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error,
      });
    }

  }
  async approveCity(request, response) {
    console.log("Welcome Test")
    try {
      const result = await helper.approveCity(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error,
      });
    }

  }
  async updateCitymasterStatus(request, response) {
    console.log("Welcome Test")
    try {
      const result = await helper.updateCitymasterStatus(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error,
      });
    }

  }
  async updatepodimage(request, response) {
    console.log("Welcome Test")
    try {
      const result = await helper.updatepodimage(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error,
      });
    }

  }
  async profileDetails(request, response) {
    console.log("Welcome Test")
    try {
      const result = await helper.profileDetails(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error,
      });
    }

  }
  async get_formsubmission(request, response) {
    console.log("Welcome Test")
    try {
      const result = await helper.get_formsubmission(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error,
      });
    }

  }
  async editAddress(request, response) {
    console.log("Welcome Test")
    try {
      const result = await helper.editAddress(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error,
      });
    }

  }


  
  async uploadImage(req, res) {
    console.log("Welcome Test")
    try {
      
        var matches = req.body.base64image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
        response = {};
        
        if (matches.length !== 3) {
              return new Error('Invalid input string');
            }
            response.type = matches[1];
            response.data = new Buffer(matches[2], 'base64');
            let decodedImg = response;
            let imageBuffer = decodedImg.data;
            let type = decodedImg.type;
            let extension = mime.extension(type);
            let fileName = "image." + Date.now()+'.jpeg';
              
                var base =req.protocol+"://"+req.headers.host+"/assets/"+fileName
                fs.writeFileSync("./assets/" + fileName, imageBuffer, 'utf8');
                helper.updateimg(req,fileName)
                return res.send({"status":"success",base});
              
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error,
      });
    }

  }
      
  
  
async uploadpan_Image(req, res) {
    console.log("Welcome Test")
    try {
      
        var matches = req.body.base64image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
        response = {};
        
        if (matches.length !== 3) {
              return new Error('Invalid input string');
            }
            response.type = matches[1];
            response.data = new Buffer(matches[2], 'base64');
            let decodedImg = response;
            let imageBuffer = decodedImg.data;
            let type = decodedImg.type;
            let extension = mime.extension(type);
            let fileName = "image." + Date.now()+'.jpeg';               
                  
              var base =req.protocol+"://"+req.headers.host+"/assets/"+fileName
              fs.writeFileSync("./assets/" + fileName, imageBuffer, 'utf8');
              helper.updatepanimg(req,fileName)
              return res.send({"status":"success",base});
      
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error,
      });
    }

  }



  async uploadlicense_Image(req, res) {
    console.log("Welcome Test")
    try {
        var matches = req.body.base64image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
        response = {};
        
        if (matches.length !== 3) {
              return new Error('Invalid input string');
            }
            response.type = matches[1];
            response.data = new Buffer(matches[2], 'base64');
            let decodedImg = response;
            let imageBuffer = decodedImg.data;
            let type = decodedImg.type;
            let extension = mime.extension(type);
            let fileName = "image." + Date.now()+'.jpeg';
            
              var base =req.protocol+"://"+req.headers.host+"/assets/"+fileName
              fs.writeFileSync("./assets/" + fileName, imageBuffer, 'utf8');
              helper.updatelicenseimg(req,fileName)
              return res.send({"status":"success",base});
      
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error,
      });
    }

  }




  async uploadadhar_front_Image(req, res) {
    console.log("Welcome Test")
    try {
        var matches = req.body.base64image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
        response = {};
        
        if (matches.length !== 3) {
              return new Error('Invalid input string');
            }
            response.type = matches[1];
            response.data = new Buffer(matches[2], 'base64');
            let decodedImg = response;
            let imageBuffer = decodedImg.data;
            let type = decodedImg.type;
            let extension = mime.extension(type);
            let fileName = "image." + Date.now()+'.jpeg';
            
            var base =req.protocol+"://"+req.headers.host+"/assets/"+fileName
              fs.writeFileSync("./assets/" + fileName, imageBuffer, 'utf8');
              helper.update_adhar_front_img(req,fileName)
              return res.send({"status":"success",base});
            
      
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error,
      });
    }

  }



  async uploadadhar_back_Image(req, res) {
    console.log("Welcome Test")
    try {
        var matches = req.body.base64image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
        response = {};
        
        if (matches.length !== 3) {
              return new Error('Invalid input string');
            }
            response.type = matches[1];
            response.data = new Buffer(matches[2], 'base64');
            let decodedImg = response;
            let imageBuffer = decodedImg.data;
            let type = decodedImg.type;
            let extension = mime.extension(type);
            let fileName = "image." + Date.now()+'.jpeg';
                 
              var base =req.protocol+"://"+req.headers.host+"/assets/"+fileName
              fs.writeFileSync("./assets/" + fileName, imageBuffer, 'utf8');
              helper.update_adhar_back_img(req,fileName)
              return res.send({"status":"success",base});
              
      
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error,
      });
    }

  }




  async upload_delivery_Image(req, res) {
    console.log("Welcome Test")
    try {
        var matches = req.body.base64image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
        response = {};
        
        if (matches.length !== 3) {
              return new Error('Invalid input string');
            }
            response.type = matches[1];
            response.data = new Buffer(matches[2], 'base64');
            let decodedImg = response;
            let imageBuffer = decodedImg.data;
            let type = decodedImg.type;
            let extension = mime.extension(type);
            let fileName = "image." + Date.now()+'.jpeg';
                 
              var base =req.protocol+"://"+req.headers.host+"/assets/"+fileName
              fs.writeFileSync("./assets/" + fileName, imageBuffer, 'utf8');
              helper.after_delivery_img(req,fileName)
              return res.send({"status":"success",base});
              
      
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error,
      });
    }

  }

  async profile_update(request, response) {
    console.log("Welcome Test")
    try {
      const result = await helper.profile_update(request);           
      console.log(result);
      if (result === null || result === undefined ) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error,
      });
    }

  }


  async fcm_token(request, response) {
    console.log("Welcome Test")
    try {
      const result = await helper.fcm_token(request);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error,
      });
    }

  }
  async editDistance(request, response) {
    console.log("Welcome Test")
    try {
      const result = await helper.editDistance(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error,
      });
    }

  }
  async deleteDistance(request, response) {
    console.log("Welcome Test")
    try {
      const result = await helper.deleteDistance(request.body);
      if (result === null || result === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_INFO_WRONG,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          message: CONSTANTS.USER_SUCCESS,
          data: result
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: error,
      });
    }

  }


      }
      
      // this.app.use(bodyParser.json({limit: '5000mb'}));
      // this.app.use(bodyParser.urlencoded({limit: "5000mb", extended: true, parameterLimit:10000000000}));
      module.exports = new RouteHandler();
      