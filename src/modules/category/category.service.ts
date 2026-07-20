import { prisma } from "../../lib/prisma";
import { ICategory } from "./category.interface";

const createCategory = async (payload: ICategory) => {
  const categoryExist = await prisma.category.findUnique({
    where: {
      name: payload.name,
    },
  });

  if (categoryExist) {
    throw new Error("Category already exists");
  }

  const category = await prisma.category.create({
    data: payload,
  });

  return category;
};

const getAllCategories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return categories;
};

const getSingleCategory = async (id: string) => {
  const category = await prisma.category.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return category;
};

const updateCategory = async (
  id: string,
  payload: Partial<ICategory>
) => {
  const existingCategory = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!existingCategory) {
    throw new Error("Category not found");
  }
  if (payload.name) {
    const duplicateCategory =
      await prisma.category.findFirst({
        where: {
          name: payload.name,
          NOT: {
            id,
          },
        },
      });
    if (duplicateCategory) {
      throw new Error(
        "Category with this name already exists"
      );
    }
  }
  if (Object.keys(payload).length === 0) {
    throw new Error(
      "No fields provided for update"
    );
  }
  const updatedCategory =
    await prisma.category.update({
      where: {
        id,
      },

      data: payload,
    });
  return updatedCategory;
};

const deleteCategory = async (id: string) => {
  await prisma.category.delete({
    where: {
      id,
    },
  });

  return null;
};

export const categoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
