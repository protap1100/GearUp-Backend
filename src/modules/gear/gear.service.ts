import { prisma } from "../../lib/prisma";


// Get all gear
const getAllGear = async () => {
  const gears = await prisma.gearItem.findMany({
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

    orderBy: {
      createdAt: "desc",
    },
  });

  return gears;
};

// Get single gear
const getSingleGear = async (id: string) => {
  const gear = await prisma.gearItem.findUniqueOrThrow({
    where: {
      id,
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



export const gearService = {
  getAllGear,
  getSingleGear,
};
