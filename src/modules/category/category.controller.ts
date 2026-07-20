import { Request, Response } from "express";
import { catchAsync } from "../../utilties/catchAsync";
import { categoryService } from "./category.service";
import { sendResponse } from "../../utilties/sendResponse";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await categoryService.createCategory(req.body);
  console.log(category);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Category created successfully",
    data: category,
  });
});

const getAllCategories = catchAsync(async (req, res) => {
  const result = await categoryService.getAllCategories();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Categories retrieved successfully",
    data: result,
  });
});

const getSingleCategory = catchAsync(async (req, res) => {
  const result = await categoryService.getSingleCategory(
    req.params.id as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Category retrieved successfully",
    data: result,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const result = await categoryService.updateCategory(
    req.params.id as string,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Category updated successfully",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  await categoryService.deleteCategory(req.params.id as string);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Category deleted successfully",
    data: null,
  });
});

export const categoryController = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
