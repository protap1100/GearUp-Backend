import { prisma } from "../../lib/prisma";
import { IGear } from "../gear/gear.interface";

// Create Gear
const createGear = async (payload: IGear, providerId: string) => {
  // Check category exists
  const category = await prisma.category.findUnique({
    where: {
      id: payload.categoryId,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  const gear = await prisma.gearItem.create({
    data: {
      ...payload,
      providerId,
    },
    include: {
      category: true,
      provider: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return gear;
};

// Update Gear
const updateGear = async (
  id: string,
  providerId: string,
  payload: Partial<IGear>,
) => {
  const gear = await prisma.gearItem.findUnique({
    where: {
      id,
    },
  });

  if (!gear) {
    throw new Error("Gear not found");
  }

  if (gear.providerId !== providerId) {
    throw new Error("You can only update your own gear");
  }

  // Validate category if changing category
  if (payload.categoryId) {
    const category = await prisma.category.findUnique({
      where: {
        id: payload.categoryId,
      },
    });

    if (!category) {
      throw new Error("Category not found");
    }
  }

  const updatedGear = await prisma.gearItem.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
      provider: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return updatedGear;
};

// Delete Gear
const deleteGear = async (id: string, providerId: string) => {
  const gear = await prisma.gearItem.findUnique({
    where: {
      id,
    },
  });

  if (!gear) {
    throw new Error("Gear not found");
  }

  if (gear.providerId !== providerId) {
    throw new Error("You can only delete your own gear");
  }

  const deletedGear = await prisma.gearItem.delete({
    where: {
      id,
    },
  });

  return deletedGear;
};

export const providerService = {
  createGear,
  updateGear,
  deleteGear,
};