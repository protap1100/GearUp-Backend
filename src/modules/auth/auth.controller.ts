import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utilties/catchAsync";
import httpsStatus from "http-status";
import { authService } from "./auth.service";
import { sendResponse } from "../../utilties/sendResponse";
import { userServices } from "../user/user.service";

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const { accessToken, refreshToken } = await authService.loginUser(payload);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    sendResponse(res, {
      success: true,
      message: "User logged successfully",
      statusCode: httpsStatus.OK,
      data: { accessToken, refreshToken },
    });
  },
);

const refreshToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    const { accessToken } = await authService.refreshToken(refreshToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7, 
    });

    sendResponse(res, {
      success: true,
      statusCode: httpsStatus.OK,
      message: "Token refreshed successfully",
      data: accessToken,
    });
  },
);

const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const profile = await authService.getMyProfileFromDB(
      req.user?.id as string,
    );

    console.log(req.user?.id);
    res.send({
      success: true,
      statusCode: httpsStatus.OK,
      message: "User profile fetched successfully",
      data: {
        profile,
      },
    });
  },
);

export const authController = {
  loginUser,
  refreshToken,
  getMyProfile
};
