import { prisma } from "../../lib/prisma";
import { IGear } from "../gear/gear.interface";

const createGear = async (payload: IGear, providerId: string) => {
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
  });

  return gear;
};


// Update gear
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

  const updatedGear = await prisma.gearItem.update({
    where: {
      id,
    },

    data: payload,
  });

  return updatedGear;
};

// Delete gear
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
  await prisma.gearItem.delete({
    where: {
      id,
    },
  });
  return null;
};


export const providerService = {
  createGear,
  updateGear,
  deleteGear,
};