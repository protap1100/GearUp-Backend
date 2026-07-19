import { NextFunction, Request, RequestHandler, Response } from "express";
import httpsStatus from "http-status";
import { userServices } from "./user.service";
import { catchAsync } from "../../utilties/catchAsync";
import { sendResponse } from "../../utilties/sendResponse";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const user = await userServices.registerUserIntoDB(payload);
    sendResponse(res, {
      success: true,
      statusCode: httpsStatus.CREATED,
      message: "user Registered Successfully",
      data: { user },
    });
  },
);
export const userController = {
  createUser,
};
