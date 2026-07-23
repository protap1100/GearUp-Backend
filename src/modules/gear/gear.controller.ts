import { Request, Response } from "express";
import { catchAsync } from "../../utilties/catchAsync";
import { sendResponse } from "../../utilties/sendResponse";
import { gearService } from "./gear.service";

const getAllGear = catchAsync(async (req: Request, res: Response) => {
  const gears = await gearService.getAllGear();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Gear retrieved successfully",
    data: gears,
  });
});

const getSingleGear = catchAsync(async (req: Request, res: Response) => {
  const gear = await gearService.getSingleGear(req.params.id as string);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Gear retrieved successfully",
    data: gear,
  });
});

export const gearController = {
  getAllGear,
  getSingleGear,
};
