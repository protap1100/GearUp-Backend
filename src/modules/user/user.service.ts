import bcrypt from "bcryptjs";
import { RegisterUserPayload } from "./user.interface";
import config from "../../config";
import { prisma } from "../../lib/prisma";

const registerUserIntoDB = async (payload: RegisterUserPayload) => {
  const { name, email, password, role, phone, address, profilePhoto } = payload;
  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (isUserExist) {
    throw new Error("User with this email already exists");
  }
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );
  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      address,
      profilePhoto,
    },
  });
  const { password: _, ...userWithoutPassword } = createdUser;
  return userWithoutPassword;
};


export const userServices = {
  registerUserIntoDB,
};
