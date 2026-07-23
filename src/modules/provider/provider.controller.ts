import { Request, Response } from "express";
import { catchAsync } from "../../utilties/catchAsync";
import { sendResponse } from "../../utilties/sendResponse";
import { providerService } from "./provider.service";

const createGear = catchAsync(async (req: Request, res: Response) => {
  const providerId = req.user!.id;

  const gear = await providerService.createGear(req.body, providerId);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Gear created successfully",
    data: gear,
  });
});
const updateGear = catchAsync(async (req: Request, res: Response) => {
  const gear = await providerService.updateGear(
    req.params.id as string,
    req.user!.id,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Gear updated successfully",
    data: gear,
  });
});
const deleteGear = catchAsync(async (req: Request, res: Response) => {
  await providerService.deleteGear(req.params.id as string, req.user!.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Gear deleted successfully",
    data: null,
  });
});

export const providerController = {
  createGear,
  updateGear,
  deleteGear,
};
